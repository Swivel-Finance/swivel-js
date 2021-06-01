import { Order } from '../order';
import { TxResponse } from '../transaction';

export interface SwivelContract {

    address?: string;

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    initiate (o: Order[], a: (number | string)[], s: string[]): Promise<TxResponse>;

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    exit (o: Order[], a: (number | string)[], s: string[]): Promise<TxResponse>;

    /**
     * @param o - offline swivel order
     * @param a - valid ECDSA signature
     */
    cancel (o: Order, s: string): Promise<TxResponse>;
}
