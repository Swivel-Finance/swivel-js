import { Contract, Signer } from 'ethers';
import { Abi, Order, SwivelContract, TxResponse } from '../../../interfaces';
import { prepareAmount, prepareOrder, splitSignature, unwrap } from '../utils';

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
    constructor (address: string, abi: Abi, s: Signer) {

        this.contract = new Contract(address, abi, s);
        this.address = this.contract.address;
    }

    async NAME (): Promise<string> {

        return unwrap<string>(await this.contract.functions.NAME());
    }

    async VERSION (): Promise<string> {

        return unwrap<string>(await this.contract.functions.VERSION());
    }

    async DOMAIN (): Promise<string> {

        return unwrap<string>(await this.contract.functions.DOMAIN());
    }

    /**
     * Returns the associated marketplace contract address.
     */
    async marketPlace (): Promise<string> {

        return unwrap<string>(await this.contract.functions.marketPlace());
    }

    /**
     * Checks if an order was cancelled.
     *
     * @param k - the key of the order
     */
    async cancelled (k: string): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.cancelled(k));
    }

    /**
     * // TODO: How to describe this correctly?
     * Retrieves an order's filled volume.
     *
     * @param k - the key of the order
     */
    async filled (k: string): Promise<number> {

        return unwrap<number>(await this.contract.functions.filled(k));
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

        return await this.contract.functions.initiate(orders, amounts, signatures) as TxResponse;
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

        return await this.contract.functions.exit(orders, amounts, signatures) as TxResponse;
    }

    /**
     * @param o - offline swivel order
     * @param a - valid ECDSA signature
     */
    async cancel (o: Order, s: string): Promise<TxResponse> {

        const order = prepareOrder(o);
        const signature = splitSignature(s);

        return await this.contract.functions.cancel(order, signature) as TxResponse;
    }
}
