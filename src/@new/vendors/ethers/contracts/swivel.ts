import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from '@ethersproject/contracts';
import { ABI, Order, SwivelContract, TxResponse } from '../../../interfaces';
import { prepareOrder, splitSignature } from '../utils';

export class EthersSwivelContract implements SwivelContract {

    protected contract: Contract;

    address: string;

    constructor (a: string, abi: ABI, s: Signer) {

        this.contract = new Contract(a, abi, s);
        this.address = this.contract.address;
    }

    async initiate (o: Order[], a: number[], s: string[]): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    async exit (o: Order[], a: number[], s: string[]): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    async cancel (o: Order, s: string): Promise<TxResponse> {

        const order = prepareOrder(o);
        const signature = splitSignature(s);

        return await this.contract.functions.cancel(order, signature) as Promise<TxResponse>;
    }
}
