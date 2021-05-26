import Deployed from './abstracts/deployed';
import { SWIVEL_ABI } from './constants';
import { CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED } from './errors';
export default class extends Deployed {
    /**
     * @param vendor - Instance of a Vendor class
     * @param i - optional chainId for the deployed smart contract. NOTE: signOrder requires this be set
     * @param verifier - optional address of a deployed verifying contract. NOTE: signOrder requires this be set
     */
    constructor(vendor, i, verifier) {
        super(vendor, SWIVEL_ABI);
        this.chainId = i;
        this.verifyingContract = verifier;
    }
    /**
     * @remarks
     * Proxy method which delegates to its vendor's signOrder method.
     *
     * @param o - raw order object
     * @return Vendor specific Promise
     */
    async signOrder(o) {
        if (!this.chainId || !this.verifyingContract)
            return Promise.reject(CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED);
        return await this.vendor.signOrder(o, this.chainId, this.verifyingContract);
    }
    /**
     * @remarks
     * Calls to its vendor to prepare the order, gets the signature components then attempts to cancel
     * via the swivel contract method
     *
     * @param o - order
     * @param s - signature
     * @return Promise resolving to a transaction response
     */
    async cancel(o, s) {
        var _a;
        const order = this.vendor.prepareOrder(o);
        const components = this.vendor.splitSignature(s);
        return await ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.cancel(order, components));
    }
}
//# sourceMappingURL=swivel.js.map