import { Keyed, Contract, TransactOpts } from '../interfaces';
import Vendor from './vendor';
import { Abi } from '../@types';
export default abstract class implements Keyed {
    [key: string]: any;
    abi: Abi;
    vendor: Vendor;
    contract?: Contract;
    protected constructor(v: Vendor, a: Abi);
    at(a: string, o?: TransactOpts): boolean;
}
