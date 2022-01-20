import { TxResponse } from '../transaction.js';
import { uint256 } from '../uint256.js';

export interface Market {
    cTokenAddr: string;
    zcTokenAddr: string;
    vaultAddr: string;
    maturityRate: string;
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
     * Returns the paused status.
     */
    paused (): Promise<boolean>;

    /**
     * Retrieve the market information.
     *
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    markets (u: string, m: uint256): Promise<Market>;

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
