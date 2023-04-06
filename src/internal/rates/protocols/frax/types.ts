/**
 * An interface for a subset of Frax's API schema.
 *
 * @remarks
 * https://api.frax.finance/v2/frxeth/summary/latest
 *
 * All APRs are in %.
 * All balances are in contracted token denomination.
 * All prices are in contracted token denomination.
 * `intervalTimestamp` is an ISO date string.
 */
export interface FraxApiSchema {
    intervalTimestamp: string;
    blockNumber: number;
    epoch: number;
    frxethTotalSupply: number;
    sfrxethTotalAssets: number;
    sfrxethStoredTotalAssets: number;
    sfrxethTotalSupply: number;
    sfrxethFrxethPrice: number;
    sfrxethApr: number;
    // frxethEthCurvePrice: number;
    // frxethEthCurveLpSupply: number;
    // frxethEthCurveEthBalance: number;
    // frxethEthCurveFrxethBalance: number;
    // frxethEthCurveRatio: number;
    // frxethEthCurveTotalApr: number;
    // frxethEthCurveAprBreakdown: {
    //     fxs: number;
    //     crv: number;
    //     cvx: number;
    //     fees: number;
    // },
    // activeValidatorCt: number;
    // pendingValidatorCt: number;
    // totalValidatorBalance: number;
    // validatorMarketShare: number;
    // cumulativeValidatorBeaconRewards: number;
    // cumulativeValidatorTipsAndMev: number;
    // cumulativeBlocksProduced: number;
    ethPriceUsd: number;
}
