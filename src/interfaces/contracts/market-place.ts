import { TxResponse } from '../transaction';
import { uint256 } from '../uint256';

export interface Market {
    cTokenAddr: string;
    zcTokenAddr: string;
    vaultAddr: string;
}

export interface MarketPlaceContract {

    address?: string;

    /**
     * Returns the admin address.
     */
    admin (): Promise<string>;

    /**
     * Returns the associated swivel contract address.
     */
    swivel (): Promise<string>;

    /**
     * Retrieve the market information.
     *
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    markets (u: string, m: uint256): Promise<Market>;

    /**
     * Checks if a market is mature.
     *
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    mature (u: string, m: uint256): Promise<boolean>;

    /**
     * Retrieve the market maturity.
     *
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    maturityRate (u: string, m: uint256): Promise<string>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    matureMarket (u: string, m: uint256): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - target to be transferred to
     * @param a - amount of notional to be transferred
     */
    transferVaultNotional (u: string, m: uint256, t: string, a: uint256): Promise<TxResponse>;
}
