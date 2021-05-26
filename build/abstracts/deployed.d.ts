/**
 * @remarks
 * Base class of all Higher Order Contracts (HOCs).
 * Note that we do not want to couple this class to any specific Vendor.
 */
import { Keyed, Contract, TxOpts } from '../interfaces';
import Vendor from './vendor';
import { Abi } from '../@types';
export default abstract class implements Keyed {
    [key: string]: any;
    abi: Abi;
    vendor: Vendor;
    contract?: Contract;
    /**
     * @param v - Optional Vendor the HOC will use
     * @param a - Compiled abi of the smart contract this HOC wraps
     */
    protected constructor(v: Vendor, a: Abi);
    /**
     * @remarks Hoists the vendor specific contract wrapping to `this.contract`
     * @param a - ETH address of an already deployed smart contract
     * @param o - Optional specified transaction options
     *
     * @returns boolean indicating a successful wrapping of the target deployed contract
     */
    at(a: string, o?: TxOpts): boolean;
}
//# sourceMappingURL=deployed.d.ts.map