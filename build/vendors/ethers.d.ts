import { Components, Contract, Order } from '../interfaces';
import Vendor from '../abstracts/vendor';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
import { Abi } from '../@types';
import { BigNumber } from 'ethers';
import { ValidOrder } from './interfaces/order';
export default class extends Vendor {
    constructor(p: Provider, s?: Signer);
    setSigner(p: any): void;
    contract(address: string, abi: Abi): Contract;
    prepareOrder(o: Order): ValidOrder;
    signOrder(o: ValidOrder): Promise<string>;
    splitSignature(s: string): Components;
    prepareFillingAmount(a: string): BigNumber;
    private requireSignerOrProvider;
}
