import { SWIVEL_ABI } from './constants';
import { CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED, CONTRACT_INSTANTIATION_FAILED, MISSING_CONTRACT_ADDRESS } from './errors';
import { Order, SwivelContract, TxOptions, TxResponse, uint256, Vendor } from './interfaces';

export class Swivel implements SwivelContract {

    protected contract?: SwivelContract;

    protected options?: TxOptions;

    protected abi = SWIVEL_ABI;

    address?: string;

    vendor: Vendor;

    chainId?: number;

    verifyingContract?: string;

    /**
     * Create a new swivel instance
     *
     * // TODO: update parameter description
     * @param v - a vendor instance (ethers.js or web3.js vendor)
     * @param i - optional chain-id for the deployed smart contract; NOTE: signOrder requires this be set
     * @param c - optional address of a deployed verifying contract; NOTE: signOrder requires this be set
     */
    constructor (v: Vendor, i?: number, c?: string) {

        this.vendor = v;

        this.chainId = i;
        this.verifyingContract = c;
    }

    /**
     * Set the deployed smart contract address
     *
     * @remarks
     * Creates a vendor specific instance of the deployed swivel smart contract
     * and wraps it in a generic contract representation.
     *
     * @example
     * // TODO: make a good example
     * ```
     * const ethersProvider = getDefaultProvider();
     * const signer = Wallet.createRandom().connect(ethersProvider);
     * const vendor = new EthersVendor(ethersProvider, signer);
     * const swivel = new Swivel(vendor, 1, '0x123').at('0xabc');
     * ```
     *
     * @param a - ETH address of the already deployed swivel smart contract
     * @param o - optional transaction options
     *
     * @returns the swivel instance for chaining
     */
    at (a: string, o?: TxOptions): Swivel {

        this.contract = this.vendor.contracts.swivel(a, this.abi, o);

        if (!this.contract) throw CONTRACT_INSTANTIATION_FAILED('swivel', a);

        this.address = this.contract.address;
        this.options = o;

        return this;
    }

    /**
     * Sign an order using EIP-712.
     *
     * @remarks
     * https://eips.ethereum.org/EIPS/eip-712
     *
     * @param o - order to sign
     */
    async signOrder (o: Order): Promise<string> {

        if (!this.chainId || !this.verifyingContract) throw CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED;

        return await this.vendor.signOrder(o, this.chainId, this.verifyingContract);
    }

    // ============================
    // Contract getters and methods
    // ============================

    /**
     * Returns the associated marketplace contract address.
     */
    async NAME (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.NAME();
    }

    async VERSION (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.VERSION();
    }

    async DOMAIN (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.DOMAIN();
    }

    /**
     * Returns the associated marketplace contract address.
     */
    async marketPlace (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.marketPlace();
    }

    /**
     * Checks if an order was cancelled.
     *
     * @param k - the key of the order
     */
    async cancelled (k: string): Promise<boolean> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.cancelled(k);
    }

    /**
     * // TODO: How to describe this correctly?
     * Retrieves an order's filled volume.
     *
     * @param k - the key of the order
     */
    async filled (k: string): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.filled(k);
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    async initiate (o: Order[], a: uint256[], s: string[]): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.initiate(o, a, s);
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    async exit (o: Order[], a: uint256[], s: string[]): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.exit(o, a, s);
    }

    /**
     * @param o - offline swivel order
     * @param a - valid ECDSA signature
     */
    async cancel (o: Order, s: string): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.cancel(o, s);
    }
}
