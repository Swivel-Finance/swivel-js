/**
 * The basis points unit for Lido's fee.
 *
 * @remarks
 * https://docs.lido.fi/contracts/lido#getfee
 */
// export const BASIS_POINTS = 10000;

/**
 * A minimal subset of Lido's wstETH ABI.
 *
 * @remarks
 * https://docs.lido.fi/contracts/wsteth
 */
export const WSTETH_ABI = [
    'function stETH() view returns (address)',
    'function stEthPerToken() view returns (uint256)',
];

/**
 * The Lido API endpoint for APR.
 * @remarks
 * https://docs.lido.fi/integrations/api#last-lido-apr-for-steth
 */
export const LIDO_API = 'https://eth-api.lido.fi/v1/protocol/steth/apr/last';
