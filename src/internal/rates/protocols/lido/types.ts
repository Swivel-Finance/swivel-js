import { BigNumber, Contract } from 'ethers';

/**
 * An interface for a subset of Lido's wstETH ABI.
 *
 * @remarks
 * https://docs.lido.fi/contracts/wsteth
 */
export interface wstETHContract extends Contract {
    stETH (): Promise<string>;
    stEthPerToken (): Promise<BigNumber>;
}

/**
 * An interface for a subset of Lido's (stETH) ABI.
 *
 * @remarks
 * https://docs.lido.fi/contracts/lido
 */
export interface LidoContract extends Contract {
    getFee (): Promise<number>;
    getOracle (): Promise<string>;
}

/**
 * An interface for a subset of Lido's Oracle ABI.
 *
 * @remarks
 * https://docs.lido.fi/contracts/lido-oracle
 */
export interface LidoOracleContract extends Contract {
    getLastCompletedReportDelta (): Promise<[BigNumber, BigNumber, BigNumber]>;
}
