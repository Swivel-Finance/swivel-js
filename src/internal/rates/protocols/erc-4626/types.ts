import type { BigNumber, BigNumberish, Contract } from 'ethers';

/**
 * An interface for a subset of the ERC-4626 token contract.
 */
export interface ERC4626Contract extends Contract {
    convertToAssets (shares: BigNumberish): Promise<BigNumber>;
}
