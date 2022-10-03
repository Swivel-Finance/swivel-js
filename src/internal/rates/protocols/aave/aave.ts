import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from 'ethers';
import { SECONDS_PER_YEAR } from '../../../../constants/index.js';
import { fixed, stringify } from '../../helpers/index.js';
import { AAVE_MANTISSA, AAVE_POOL_ABI, AAVE_TOKEN_ABI } from './constants.js';
import { AavePoolContract, AaveTokenContract } from './types.js';

/**
 * Aave's exchangeRate implementation.
 *
 * @remarks
 * https://docs.aave.com/developers/v/2.0/the-core-protocol/lendingpool#getreservenormalizedincome
 *
 * Aave's exchange rate is returned as an int scaled by 1e+27.
 * A market's cTokenAddre is Aave's aToken adddress.
 *
 * @internal
 */
export async function exchangeRateAave (a: string, s: Provider | Signer): Promise<string | undefined> {

    const tokenContract = new Contract(a, AAVE_TOKEN_ABI, s) as AaveTokenContract;

    const [pool, underlying] = await Promise.all([
        tokenContract.POOL(),
        tokenContract.UNDERLYING_ASSET_ADDRESS(),
    ]);

    const poolContract = new Contract(pool, AAVE_POOL_ABI, s) as AavePoolContract;

    return (await poolContract.getReserveNormalizedIncome(underlying)).toString();
}

/**
 * Aave's interestRate implementation.
 *
 * @remarks
 * https://docs.aave.com/risk/liquidity-risk/borrow-interest-rate#deposit-apy
 * https://docs.aave.com/developers/v/2.0/guides/apy-and-apr
 *
 * @internal
 */
export async function interestRateAave (a: string, s: Provider | Signer): Promise<string | undefined> {

    const tokenContract = new Contract(a, AAVE_TOKEN_ABI, s) as AaveTokenContract;

    const [pool, underlying] = await Promise.all([
        tokenContract.POOL(),
        tokenContract.UNDERLYING_ASSET_ADDRESS(),
    ]);

    const poolContract = new Contract(pool, AAVE_POOL_ABI, s) as AavePoolContract;

    const data = await poolContract.getReserveData(underlying);

    // 'un'-scale the liquidity rate and turn it into a proper rate
    const supplyRate = fixed(data.currentLiquidityRate).divUnsafe(fixed(AAVE_MANTISSA));

    // compound the supply rate and derive the supply APY
    const supplyAPY = Math.pow(Number(supplyRate.toString()) / SECONDS_PER_YEAR + 1, SECONDS_PER_YEAR) - 1;

    return stringify(supplyAPY);
}
