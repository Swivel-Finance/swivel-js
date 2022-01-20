import { Contract, ethers, Signer } from 'ethers';
import { Abi, Order, SwivelContract, TxResponse, uint256 } from '../../../interfaces/index.js';
import { fromBigNumber, gasOptions, prepareOrder, splitSignature, toBigNumber, unwrap } from '../utils/index.js';

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

    async domain (): Promise<string> {

        return unwrap<string>(await this.contract.functions.domain());
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
     * Retrieves an order's filled volume.
     *
     * @param k - the key of the order
     */
    async filled (k: string): Promise<string> {

        const filled = unwrap<ethers.BigNumber>(await this.contract.functions.filled(k));

        return fromBigNumber(filled);
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    async initiate (o: Order[], a: uint256[], s: string[]): Promise<TxResponse> {

        const orders = o.map(order => prepareOrder(order));
        const amounts = a.map(amount => toBigNumber(amount));
        const signatures = s.map(signature => splitSignature(signature));

        const options = await gasOptions(this.contract, 'initiate', orders, amounts, signatures);

        return await this.contract.functions.initiate(orders, amounts, signatures, options) as TxResponse;
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    async exit (o: Order[], a: uint256[], s: string[]): Promise<TxResponse> {

        const orders = o.map(order => prepareOrder(order));
        const amounts = a.map(amount => toBigNumber(amount));
        const signatures = s.map(signature => splitSignature(signature));

        const options = await gasOptions(this.contract, 'exit', orders, amounts, signatures);

        return await this.contract.functions.exit(orders, amounts, signatures, options) as TxResponse;
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

    /**
     * @param u - underlying address
     * @param m - maturity timestamp
     * @param a - amount to split
     */
    async splitUnderlying (u: string, m: uint256, a: uint256): Promise<TxResponse> {

        const maturity = toBigNumber(m);
        const amount = toBigNumber(a);

        const options = await gasOptions(this.contract, 'splitUnderlying', u, maturity, amount);

        return await this.contract.functions.splitUnderlying(u, maturity, amount, options) as TxResponse;
    }

    /**
     * @param u - underlying address
     * @param m - maturity timestamp
     * @param a - amount to combine
     */
    async combineTokens (u: string, m: uint256, a: uint256): Promise<TxResponse> {

        const maturity = toBigNumber(m);
        const amount = toBigNumber(a);

        const options = await gasOptions(this.contract, 'combineTokens', u, maturity, amount);

        return await this.contract.functions.combineTokens(u, maturity, amount, options) as TxResponse;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param a - amount of zcTokens being redeemed
     */
    async redeemZcToken (u: string, m: uint256, a: uint256): Promise<TxResponse> {

        const maturity = toBigNumber(m);
        const amount = toBigNumber(a);

        return await this.contract.functions.redeemZcToken(u, maturity, amount) as TxResponse;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async redeemVaultInterest (u: string, m: uint256): Promise<TxResponse> {

        const maturity = toBigNumber(m);

        const options = await gasOptions(this.contract, 'redeemVaultInterest', u, maturity);

        return await this.contract.functions.redeemVaultInterest(u, maturity, options) as TxResponse;
    }
}
