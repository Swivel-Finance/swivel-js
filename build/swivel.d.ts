import Deployed from './abstracts/deployed';
import Vendor from './abstracts/vendor';
import { Order, TxResponse } from './interfaces';
export default class extends Deployed {
    chainId: any;
    verifyingContract: any;
    /**
     * @param vendor - Instance of a Vendor class
     * @param i - optional chainId for the deployed smart contract. NOTE: signOrder requires this be set
     * @param verifier - optional address of a deployed verifying contract. NOTE: signOrder requires this be set
     */
    constructor(vendor: Vendor, i?: number, verifier?: string);
    /**
     * @remarks
     * Proxy method which delegates to its vendor's signOrder method.
     *
     * @param o - raw order object
     * @return Vendor specific Promise
     */
    signOrder(o: Order): Promise<string>;
    /**
     * @remarks
     * Calls to its vendor to prepare the order, gets the signature components then attempts to cancel
     * via the swivel contract method
     *
     * @param o - order
     * @param s - signature
     * @return Promise resolving to a transaction response
     */
    cancel(o: Order, s: string): Promise<TxResponse>;
}
//# sourceMappingURL=swivel.d.ts.map