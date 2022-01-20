import { SWIVEL_ABI } from './constants/index.js';
import { CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED, CONTRACT_INSTANTIATION_FAILED, MISSING_CONTRACT_ADDRESS } from './errors/index.js';
import { Order, SwivelContract, TxOptions, TxResponse, uint256, Vendor } from './interfaces/index.js';

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
     * @param v - a vendor instance (ethers.js or web3.js vendor)
     * @param i - chain-id for the deployed smart contract; NOTE: signOrder requires this be set
     * @param c - address of a deployed verifying contract (this is usually the swivel contract address); NOTE: signOrder requires this be set
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
     * ```
     * // using ethers.js with MetaMask, create a provider and signer
     * const provider = new ethers.providers.Web3Provider(window.ethereum);
     * const signer = provider.getSigner();
     *
     * // create a new EthersVendor instance
     * const vendor = new EthersVendor(provider, signer);
     *
     * // create a Swivel instance with the EtherVendor instance
     * const chainId = 4;
     * const swivelAddress = '0x123';
     * const swivel = new Swivel(vendor, chainId, swivelAddress).at(swivelAddress);
     * ```
     *
     * @param a - ETH address of the already deployed swivel smart contract
     * @param o - optional transaction options
     *
     * @returns the swivel instance
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

    async NAME (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.NAME();
    }

    async VERSION (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.VERSION();
    }

    async domain (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.domain();
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

    /**
     * @param u - underlying address
     * @param m - maturity timestamp
     * @param a - amount to split
     */
    async splitUnderlying (u: string, m: uint256, a: uint256): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.splitUnderlying(u, m, a);
    }

    /**
     * @param u - underlying address
     * @param m - maturity timestamp
     * @param a - amount to combine
     */
    async combineTokens (u: string, m: uint256, a: uint256): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.combineTokens(u, m, a);
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param a - amount of zcTokens being redeemed
     */
    async redeemZcToken (u: string, m: uint256, a: uint256): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.redeemZcToken(u, m, a);
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async redeemVaultInterest (u: string, m: uint256): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.redeemVaultInterest(u, m);
    }
}
