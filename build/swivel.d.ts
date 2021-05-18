import Deployed from './abstracts/deployed';
import Vendor from './abstracts/vendor';
import { Order, TxResponse } from './interfaces';
export default class extends Deployed {
    chainId: any;
    verifyingContract: any;
    constructor(vendor: Vendor, i?: number, verifier?: string);
    signOrder(o: Order): Promise<string>;
    cancel(o: Order, s: string): Promise<TxResponse>;
}
