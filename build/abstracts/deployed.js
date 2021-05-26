/**
 * @remarks
 * Base class of all Higher Order Contracts (HOCs).
 * Note that we do not want to couple this class to any specific Vendor.
 */
export default class {
    /**
     * @param v - Optional Vendor the HOC will use
     * @param a - Compiled abi of the smart contract this HOC wraps
     */
    constructor(v, a) {
        this.vendor = v;
        this.abi = a;
    }
    /**
     * @remarks Hoists the vendor specific contract wrapping to `this.contract`
     * @param a - ETH address of an already deployed smart contract
     * @param o - Optional specified transaction options
     *
     * @returns boolean indicating a successful wrapping of the target deployed contract
     */
    at(a, o) {
        this.contract = this.vendor.contract(a, this.abi, o);
        return !!this.contract;
    }
}
//# sourceMappingURL=deployed.js.map