import { Keyed, Contract, TxOpts, Order, Components, VendorOrder } from '../interfaces';
import { Abi } from '../@types';
export default abstract class implements Keyed {
    [key: string]: any;
    provider: any;
    signer: any;
    abstract contract(address: string, abi: Abi, o?: TxOpts): Contract;
    abstract setSigner(p: any): void;
    abstract prepareOrder(o: Order): VendorOrder;
    abstract signOrder(o: Order, i: number, v: string): Promise<string>;
    abstract splitSignature(s: string): Components;
    abstract prepareFillingAmount(a: string): any;
}
