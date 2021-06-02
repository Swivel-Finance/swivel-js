import { TxResponse } from '../transaction';

export interface MarketplaceContract {

    address?: string;

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
     * @param a - amount of zcTokens being redeemed
     */
    calculateReturn (u: string, m: number, a: number): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param z - recipient of the minted zcToken
     * @param n - recipient of the added notional
     * @param a - amount of zcToken minted and notional added
     */
    custodialInitiate (u: string, m: number, z: string, n: string, a: number): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param z - owner of the zcToken to be burned
     * @param n - target to remove notional from
     * @param a - amount of zcToken burned and notional removed
     */
    custodialExit (u: string, m: number, z: string, n: string, a: number): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param f - owner of the zcToken to be transferred
     * @param t - target to be transferred to
     * @param a - amount of zcToken transfer
     */
    p2pZcTokenExchange (u: string, m: number, f: string, t: string, a: number): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param f - owner of the notional to be transferred
     * @param t - target to be transferred to
     * @param a - amount of notional transfer
     */
    p2pVaultExchange (u: string, m: number, f: string, t: string, a: number): Promise<TxResponse>;
}
