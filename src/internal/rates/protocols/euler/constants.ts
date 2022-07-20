import { RAY } from '../../helpers/index.js';

/**
 * A minimal subset of Euler's EToken ABI.
 */
export const EULER_TOKEN_ABI = [
    'function underlyingAsset() external view returns (address)',
    'function totalSupplyUnderlying() external view returns (uint256)',
    'function convertBalanceToUnderlying(uint256 balance) external view returns (uint256)',
];

/**
 * A minimal subset of Euler's Markets ABI.
 */
export const EULER_MARKETS_ABI = [
    'function underlyingToEToken(address underlying) external view returns (address)',
    'function underlyingToDToken(address underlying) external view returns (address)',
    'function interestRate(address underlying) external view returns (int96)',
    'function reserveFee(address underlying) external view returns (uint32)',
];

export const EULER_TOKEN_DECIMALS = 18;

// Euler's `reserveFee` is scaled by 4e+9
export const EULER_RESERVE_FEE_SCALE = 4_000_000_000;

// Euler's `interestRate` is scaled by 1e+27
export const EULER_MANTISSA = RAY;
