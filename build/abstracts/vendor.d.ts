import { Keyed, Contract, TransactOpts, Order, Components, VendorOrder } from '../interfaces';
import { Abi } from '../@types';
export default abstract class implements Keyed {
    [key: string]: any;
    provider: any;
    signer: any;
    abstract contract(address: string, abi: Abi, o?: TransactOpts): Contract;
    abstract setSigner(p: any): void;
    abstract prepareOrder(o: Order): VendorOrder;
    abstract signOrder(o: VendorOrder, i: number, v: string): Promise<string>;
    abstract splitSignature(s: string): Components;
    abstract prepareFillingAmount(a: string): any;
}
