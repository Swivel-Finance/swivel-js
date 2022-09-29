/**
 * The basis points unit for Lido's fee.
 *
 * @remarks
 * https://docs.lido.fi/contracts/lido#getfee
 */
export const BASIS_POINTS = 10000;

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
 * A minimal subset of Lido's (stETH) ABI.
 *
 * @remarks
 * https://docs.lido.fi/contracts/lido
 */
export const LIDO_ABI = [
    'function getFee() view returns (uint16)',
    'function getOracle() view returns (address)',
];

/**
 * A minimal subset of Lido's Oracle ABI.
 *
 * @remarks
 * https://docs.lido.fi/contracts/lido-oracle
 */
export const LIDO_ORACLE_ABI = [
    'function getLastCompletedReportDelta() view returns (uint256 postTotalPooledEther, uint256 preTotalPooledEther, uint256 timeElapsed)',
];
