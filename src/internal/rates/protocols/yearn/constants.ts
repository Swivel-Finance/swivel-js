/**
 * A minimal subset of Yearn's Vault ABI.
 *
 * @remarks
 * Yearn seems to have 2 types of vault contracts, YearnVaultContract and PickleJarContract,
 * both of which have different names for the exchangeRate.
 * https://github.com/yearn/yearn-sdk/blob/main/src/vault.ts
 */
export const YEARN_ABI = [
    'function pricePerShare() view returns (uint256)',
    'function getRatio() public view returns (uint256)',
];

/**
 * The Yearn API endpoint.
 *
 * @param chain - the chain id to use
 */
export const YEARN_API = (chain: number): string => `https://api.yearn.finance/v1/chains/${ chain }/vaults/all`;
