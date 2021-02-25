import { Components, Contract, Order } from '../interfaces';
import Vendor from '../abstracts/vendor';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
import { Abi } from '../@types';
import { OrderMeta, ReleaseMeta, ValidOrder } from './interfaces/order';
export default class extends Vendor {
    constructor(p: Provider, s?: Signer);
    contract(address: string, abi: Abi): Contract;
    prepareOrder(o: Order): ValidOrder;
    signOrder(o: ValidOrder): Promise<string>;
    splitSignature(s: string): Components;
    prepareOrderMeta(a: string, k: string): OrderMeta;
    prepareReleaseMeta(a: string, k: string): ReleaseMeta;
    private requireSignerOrProvider;
}
