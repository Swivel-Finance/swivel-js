import { Contract, Signer } from 'ethers';
import { ABI, Order, SwivelContract, TxResponse } from '../../../interfaces';
import { prepareOrder, splitSignature } from '../utils';

export class EthersSwivelContract implements SwivelContract {

    protected contract: Contract;

    address: string;

    /**
     * Creates a new ethers.js specific swivel contract wrapper.
     *
     * @param address - address of the deployed swivel contract
     * @param abi - the abi of the swivel contract
     * @param s - an ethers.js signer instance
     */
    constructor (address: string, abi: ABI, s: Signer) {

        this.contract = new Contract(address, abi, s);
        this.address = this.contract.address;
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    // eslint-disable-next-line @typescript-eslint/require-await
    async initiate (o: Order[], a: number[], s: string[]): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    // eslint-disable-next-line @typescript-eslint/require-await
    async exit (o: Order[], a: number[], s: string[]): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    /**
     * @param o - offline swivel order
     * @param a - valid ECDSA signature
     */
    async cancel (o: Order, s: string): Promise<TxResponse> {

        const order = prepareOrder(o);
        const signature = splitSignature(s);

        return await this.contract.functions.cancel(order, signature) as Promise<TxResponse>;
    }
}
