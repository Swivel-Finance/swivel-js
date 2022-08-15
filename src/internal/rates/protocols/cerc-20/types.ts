import type { BigNumber, Contract } from 'ethers';

/**
 * An interface for a subset of the CERC-20 token contract.
 */
export interface CERC20Contract extends Contract {
    exchangeRateCurrent (): Promise<BigNumber>;
    supplyRatePerBlock (): Promise<BigNumber>;
}
