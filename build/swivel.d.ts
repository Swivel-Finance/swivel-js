import Deployed from './abstracts/deployed';
import Vendor from './abstracts/vendor';
import { Order, TxResponse } from './interfaces';
export default class extends Deployed {
    constructor(v: Vendor);
    signOrder(o: Order): Promise<string>;
    fillFixed(o: Order, a: string, k: string, s: string): Promise<any>;
    fillFloating(o: Order, a: string, k: string, s: string): Promise<any>;
    releaseFixed(o: string, a: string): Promise<TxResponse>;
    releaseFloating(o: string, a: string): Promise<TxResponse>;
    batchFillFixed(o: Order[], a: string[], k: string, s: string[]): Promise<any>;
    batchFillFloating(o: Order[], a: string[], k: string, s: string[]): Promise<any>;
    batchRelease(o: string[], a: string[]): Promise<TxResponse>;
    cancel(o: Order, s: string): Promise<TxResponse>;
}
