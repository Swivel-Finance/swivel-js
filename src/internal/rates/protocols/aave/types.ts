import type { BigNumber, Contract } from 'ethers';

/**
 * An interface for Aave's ReserveData struct.
 */
export interface AaveReserveData {
    // stores the reserve configuration
    configuration: BigNumber;
    // the liquidity index. Expressed in ray
    liquidityIndex: BigNumber;
    // variable borrow index. Expressed in ray
    variableBorrowIndex: BigNumber;
    // the current supply rate. Expressed in ray
    currentLiquidityRate: BigNumber;
    // the current variable borrow rate. Expressed in ray
    currentVariableBorrowRate: BigNumber;
    // the current stable borrow rate. Expressed in ray
    currentStableBorrowRate: BigNumber;
    lastUpdateTimestamp: number;
    // tokens addresses
    aTokenAddress: string;
    stableDebtTokenAddress: string;
    variableDebtTokenAddress: string;
    // address of the interest rate strategy
    interestRateStrategyAddress: string;
    // the id of the reserve. Represents the position in the list of the active reserves
    id: number;
}

/**
 * An interface for a subset of Aave's Pool contract.
 */
export interface AaveTokenContract extends Contract {
    POOL (): Promise<string>;
    UNDERLYING_ASSET_ADDRESS (): Promise<string>;
}

/**
 * An interface for a subset of Aave's Pool contract.
 */
export interface AavePoolContract extends Contract {
    getReserveData (asset: string): Promise<AaveReserveData>;
    getReserveNormalizedIncome (asset: string): Promise<BigNumber>;
}
