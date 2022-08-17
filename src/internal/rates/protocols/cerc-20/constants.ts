/**
 * A read-only subset of the CERC-20 token ABI.
 */
export const CERC20_ABI = [
    'function exchangeRateCurrent() public view returns (uint)',
    'function supplyRatePerBlock() external view returns (uint)',
];

// CERC20's `supplyRatePerBlock` is scaled by 1e+18
export const CERC20_MANTISSA = 1e+18;
