import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from 'ethers';
import { SECONDS_PER_YEAR } from '../../../../constants/index.js';
import { ERC20Contract, ERC20_ABI } from '../../../token/index.js';
import { RatesConfig } from '../../config.js';
import { BASE, fixed, getChain } from '../../helpers/index.js';
import { EULER_MANTISSA, EULER_MARKETS_ABI, EULER_RESERVE_FEE_SCALE, EULER_TOKEN_ABI } from './constants.js';
import { EulerMarketsContract, EulerTokenContract } from './types.js';

/**
 * Euler's exchangeRate implementation.
 *
 * @remarks
 * https://docs.euler.finance/developers/contract-reference#convertbalancetounderlying
 *
 * Eulers exchange rate is returned as an int with the same amount of decimals as the underlying.
 * To increase the precision, we can convert a higher base value (1e+26) to underlying.
 *
 * @internal
 */
export async function exchangeRateEuler (a: string, s: Provider | Signer): Promise<string | undefined> {

    const contract = new Contract(a, EULER_TOKEN_ABI, s) as EulerTokenContract;

    return (await contract.convertBalanceToUnderlying(BASE)).toString();
}

/**
 * Euler's interestRate implementation.
 *
 * @remarks
 * https://docs.euler.finance/developers/contract-reference#interestrate
 * https://github.com/euler-xyz/euler-contracts/blob/master/contracts/views/EulerGeneralView.sol#L181-L187
 *
 * @internal
 */
export async function interestRateEuler (a: string, s: Provider | Signer, c: RatesConfig['Euler']): Promise<string | undefined> {

    const chain = await getChain(s);
    const marketsAddress = c.ADDRESSES[chain].MARKETS;

    const market = new Contract(marketsAddress, EULER_MARKETS_ABI, s) as EulerMarketsContract;
    const eToken = new Contract(a, EULER_TOKEN_ABI, s) as EulerTokenContract;

    const underlying = await eToken.underlyingAsset();
    const dTokenAddress = await market.underlyingToDToken(underlying);

    const dToken = new Contract(dTokenAddress, ERC20_ABI, s) as ERC20Contract;

    const [totalBalances, totalBorrows, borrowRate, reserveFee] = await Promise.all([
        eToken.totalSupplyUnderlying(),
        dToken.totalSupply(),
        // the interest rate in yield-per-second, scaled by 1e+27
        market.interestRate(underlying),
        // amount of interest that is redirected to the reserves, as a fraction scaled by RESERVE_FEE_SCALE
        market.reserveFee(underlying),
    ]);

    // the supply rate is derived from the borrow rate, the total amount borrowed and the total supply of underlying
    let supplyRate = totalBalances.isZero() ? fixed('0') : fixed(borrowRate).mulUnsafe(fixed(totalBorrows)).divUnsafe(fixed(totalBalances));

    // we then need to subtract the reserve fees from the supply rate
    supplyRate = supplyRate.mulUnsafe(fixed(EULER_RESERVE_FEE_SCALE).subUnsafe(fixed(reserveFee)).divUnsafe(fixed(EULER_RESERVE_FEE_SCALE)));

    // and 'un'-scale it, so we can convert it into a number and potentiate it
    supplyRate = supplyRate.divUnsafe(fixed(EULER_MANTISSA));

    // finally we can compound the supply rate and derive the supply APY
    const supplyAPY = Math.pow(Number(supplyRate.toString()) + 1, SECONDS_PER_YEAR) - 1;

    return supplyAPY.toString();
}
