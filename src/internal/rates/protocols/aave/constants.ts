import { ERC20_ABI } from '../../../token/constants.js';
import { RAY } from '../../helpers/index.js';

export const AAVE_RESERVE_DATA_ABI = '(uint256 configuration, uint128 liquidityIndex, uint128 variableBorrowIndex, uint128 currentLiquidityRate, uint128 currentVariableBorrowRate, uint128 currentStableBorrowRate, uint40 lastUpdateTimestamp, address aTokenAddress, address stableDebtTokenAddress, address variableDebtTokenAddress, address interestRateStrategyAddress, uint8 id)';

/**
 * A minimal subset of Aave's AToken ABI.
 */
export const AAVE_TOKEN_ABI = [
    ...ERC20_ABI,
    'function POOL() public view returns (address)',
    'function UNDERLYING_ASSET_ADDRESS() public view returns (address)',
];

/**
 * A minimal subset of Aave's LendingPool ABI.
 */
export const AAVE_POOL_ABI = [
    `function getReserveData(address asset) external view returns (${ AAVE_RESERVE_DATA_ABI } reserveData)`,
    'function getReserveNormalizedIncome(address asset) external view returns (uint256)',
];

// Aave's `currentLiquidityRate` is scaled by 1e+27
export const AAVE_MANTISSA = RAY;
