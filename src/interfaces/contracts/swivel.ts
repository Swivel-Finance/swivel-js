import { Order } from '../order';
import { TxResponse } from '../transaction';
import { uint256 } from '../uint256';

export interface SwivelContract {

    address?: string;

    NAME (): Promise<string>;

    VERSION (): Promise<string>;

    domain (): Promise<string>;

    /**
     * Returns the associated marketplace contract address.
     */
    marketPlace (): Promise<string>;

    /**
     * Checks if an order was cancelled.
     *
     * @param k - the key of the order
     */
    cancelled (k: string): Promise<boolean>;

    /**
     * Retrieves an order's filled volume.
     *
     * @param k - the key of the order
     */
    filled (k: string): Promise<string>;

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    initiate (o: Order[], a: uint256[], s: string[]): Promise<TxResponse>;

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    exit (o: Order[], a: uint256[], s: string[]): Promise<TxResponse>;

    /**
     * @param o - offline swivel order
     * @param s - valid ECDSA signature
     */
    cancel (o: Order, s: string): Promise<TxResponse>;

    /**
     * @param u - underlying address
     * @param m - maturity timestamp
     * @param a - amount to split
     */
    splitUnderlying (u: string, m: uint256, a: uint256): Promise<TxResponse>;

    /**
     * @param u - underlying address
     * @param m - maturity timestamp
     * @param a - amount to combine
     */
    combineTokens (u: string, m: uint256, a: uint256): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param a - amount of zcTokens being redeemed
     */
    redeemZcToken (u: string, m: uint256, a: uint256): Promise<TxResponse>;

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    redeemVaultInterest (u: string, m: uint256): Promise<TxResponse>;
}
