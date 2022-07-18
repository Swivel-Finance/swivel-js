import type { BigNumber, BigNumberish, Contract } from 'ethers';

/**
 * An interface for a subset of Euler's EToken contract.
 */
export interface EulerTokenContract extends Contract {
    underlyingAsset (): Promise<string>;
    totalSupplyUnderlying (): Promise<BigNumber>;
    convertBalanceToUnderlying (balance: BigNumberish): Promise<BigNumber>;
}

/**
 * An interface for a subset of Euler's Markets contract.
 */
export interface EulerMarketsContract extends Contract {
    underlyingToEToken (underlying: string): Promise<string>;
    underlyingToDToken (underlying: string): Promise<string>;
    interestRate (underlying: string): Promise<BigNumber>;
    reserveFee (underlying: string): Promise<number>;
}
