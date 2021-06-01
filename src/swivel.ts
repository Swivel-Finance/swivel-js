import { SWIVEL_ABI } from './constants';
import { CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED, CONTRACT_INSTANTIATION_FAILED, MISSING_CONTRACT_ADDRESS } from './errors';
import { Order, SwivelContract, TxOptions, TxResponse, Vendor } from './interfaces';

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
     * @param i - optional chain-id for the deployed smart contract; NOTE: signOrder requires this be set
     * @param c - optional address of a deployed verifying contract; NOTE: signOrder requires this be set
     */
    constructor (v: Vendor, i?: number, c?: string) {

        this.vendor = v;

        // TODO: what is the verifying contract?
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

    async signOrder (o: Order): Promise<string> {

        if (!this.chainId || !this.verifyingContract) throw CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED;

        return await this.vendor.signOrder(o, this.chainId, this.verifyingContract);
    }

    async initiate (o: Order[], a: number[], s: string[]): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.initiate(o, a, s);
    }

    async exit (o: Order[], a: number[], s: string[]): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.exit(o, a, s);
    }

    async cancel (o: Order, s: string): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('swivel');

        return await this.contract.cancel(o, s);
    }
}
