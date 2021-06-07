import { Contract, Signer } from 'ethers';
import { ABI, Order, SwivelContract, TxResponse } from '../../../interfaces';
import { prepareAmount, prepareOrder, splitSignature } from '../utils';

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

    async NAME (): Promise<string> {

        return await this.contract.functions.NAME() as Promise<string>;
    }

    async VERSION (): Promise<string> {

        return await this.contract.functions.VERSION() as Promise<string>;
    }

    async DOMAIN (): Promise<string> {

        return await this.contract.functions.DOMAIN() as Promise<string>;
    }

    /**
     * Returns the associated marketplace contract address.
     */
    async marketPlace (): Promise<string> {

        return await this.contract.functions.marketPlace() as Promise<string>;
    }

    /**
     * Checks if an order was cancelled.
     *
     * @param k - the key of the order
     */
    async cancelled (k: string): Promise<boolean> {

        // TODO: do we need to convert the order key `k`?
        // the order key should probably be formatted correctly already
        // const key = ethers.utils.formatBytes32String(k);
        return await this.contract.functions.cancelled(k) as Promise<boolean>;
    }

    /**
     * // TODO: How to describe this correctly?
     * Retrieves an order's filled volume.
     *
     * @param k - the key of the order
     */
    async filled (k: string): Promise<number> {

        // TODO: do we need to convert the order key `k`?
        // the order key should probably be formatted correctly already
        // const key = ethers.utils.formatBytes32String(k);
        return await this.contract.functions.filled(k) as Promise<number>;
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    async initiate (o: Order[], a: number[], s: string[]): Promise<TxResponse> {

        const orders = o.map(order => prepareOrder(order));
        const amounts = a.map(amount => prepareAmount(amount));
        const signatures = s.map(signature => splitSignature(signature));

        return await this.contract.functions.initiate(orders, amounts, signatures) as Promise<TxResponse>;
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    async exit (o: Order[], a: number[], s: string[]): Promise<TxResponse> {

        const orders = o.map(order => prepareOrder(order));
        const amounts = a.map(amount => prepareAmount(amount));
        const signatures = s.map(signature => splitSignature(signature));

        return await this.contract.functions.exit(orders, amounts, signatures) as Promise<TxResponse>;
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
