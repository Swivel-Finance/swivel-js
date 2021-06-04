import { TxResponse } from '../transaction';

export interface Market {
    cTokenAddr: string;
    zcTokenAddr: string;
    vaultAddr: string;
}

export interface MarketplaceContract {

    address?: string;

    /**
     * Retrieve the market information.
     *
     * @param u - underlying token address associated with the market
     */
    markets (u: string): Promise<Market>;

    /**
     * Checks if a market is mature.
     *
     * @param u - underlying token address associated with the market
     */
    mature (u: string): Promise<boolean>;

    /**
     * Retrieve the market maturity.
     *
     * @param u - underlying token address associated with the market
     */
    maturityRate (u: string): Promise<number>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    matureMarket (u: string, m: number): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param a - amount of zcTokens being redeemed
     */
    redeemZcToken (u: string, m: number, a: number): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    redeemVaultInterest (u: string, m: number): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - target to be transferred to
     * @param a - amount of notional to be transferred
     */
    transferVaultNotional (u: string, m: number, t: string, a: number): Promise<TxResponse>;
}
