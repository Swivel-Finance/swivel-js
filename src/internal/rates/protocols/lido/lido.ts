import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, Contract } from 'ethers';
import { SECONDS_PER_YEAR } from '../../../../constants/index.js';
import { unwrap } from '../../../../helpers/result.js';
import { fixed } from '../../helpers/index.js';
import { BASIS_POINTS, LIDO_ABI, LIDO_ORACLE_ABI, WSTETH_ABI } from './constants.js';
import { LidoContract, LidoOracleContract, wstETHContract } from './types.js';

/**
 * Lido's exchangeRate implementation.
 *
 * @remarks
 * https://docs.lido.fi/contracts/wsteth#stethpertoken
 *
 * A Lido market's `cTokenAddr` is the wstETH address.
 *
 * @internal
 */
export async function exchangeRateLido (a: string, s: Provider | Signer): Promise<string | undefined> {

    const contract = new Contract(a, WSTETH_ABI, s) as wstETHContract;

    return (await contract.stEthPerToken()).toString();
}

/**
 * Lido's interestRate implementation.
 *
 * @remarks
 * https://docs.lido.fi/contracts/lido-oracle#add-calculation-of-staker-rewards-apr
 *
 * A Lido market's `cTokenAddr` is the wstETH address.
 *
 * @internal
 */
export async function interestRateLido (a: string, s: Provider | Signer): Promise<string | undefined> {

    const wstETH = new Contract(a, WSTETH_ABI, s) as wstETHContract;

    // get the lido address from the wstETH contract
    const lidoAddress = await wstETH.stETH();

    const lido = new Contract(lidoAddress, LIDO_ABI, s) as LidoContract;

    // get the fee and the oracle address from the lido contract
    const [fee, oracleAddress] = await Promise.all([
        lido.getFee(),
        lido.getOracle(),
    ]);

    const oracle = new Contract(oracleAddress, LIDO_ORACLE_ABI, s) as LidoOracleContract;

    // get the data needed for calculating the APR from the oracle
    const [
        postTotalPooledEther,
        preTotalPooledEther,
        timeElapsed,
    ] = unwrap<[BigNumber, BigNumber, BigNumber]>(await oracle.getLastCompletedReportDelta());

    // decimals are based on ETH and that's enough precision for the rate
    const d = 18;

    // protocolAPR = (postTotalPooledEther - preTotalPooledEther) * secondsInYear / (preTotalPooledEther * timeElapsed)
    const protocolAPR = fixed(postTotalPooledEther, d)
        .subUnsafe(fixed(preTotalPooledEther, d))
        .mulUnsafe(fixed(SECONDS_PER_YEAR, d))
        .divUnsafe(fixed(preTotalPooledEther, d).mulUnsafe(fixed(timeElapsed, d)));

    // userAPR = protocolAPR * (1 - lidoFee / basisPoint)
    const userAPR = protocolAPR.mulUnsafe(fixed(1, d).subUnsafe(fixed(fee, d).divUnsafe(fixed(BASIS_POINTS, d))));

    return userAPR.toString();
}
