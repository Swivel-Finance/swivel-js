import { MARKETPLACE_ABI } from './constants';
import { CONTRACT_INSTANTIATION_FAILED, MISSING_CONTRACT_ADDRESS } from './errors';
import { MarketplaceContract, TxOptions, TxResponse, Vendor } from './interfaces';

export class Marketplace implements MarketplaceContract {

    protected contract?: MarketplaceContract;

    protected options?: TxOptions;

    // TODO: create the marketplace abi
    protected abi = MARKETPLACE_ABI;

    address?: string;

    vendor: Vendor;

    chainId?: number;

    verifyingContract?: string;

    /**
     * Create a new marketplace instance
     *
     * @param v - a vendor instance (ethers.js or web3.js vendor)
     * @param i - optional chain-id for the deployed smart contract
     * @param c - optional address of a deployed verifying contract
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
     * Creates a vendor specific instance of the deployed marketplace smart contract
     * and wraps it in a generic contract representation.
     *
     * @example
     * // TODO: make a good example
     * ```
     * const ethersProvider = getDefaultProvider();
     * const signer = Wallet.createRandom().connect(ethersProvider);
     * const vendor = new EthersVendor(ethersProvider, signer);
     * const marketplace = new Marketplace(vendor, 1, '0x123').at('0xabc');
     * ```
     *
     * @param a - ETH address of the already deployed marketplace smart contract
     * @param o - optional transaction options
     *
     * @returns the marketplace instance for chaining
     */
    at (a: string, o?: TxOptions): Marketplace {

        this.contract = this.vendor.contracts.marketplace(a, this.abi, o);

        if (!this.contract) throw CONTRACT_INSTANTIATION_FAILED('marketplace', a);

        this.address = this.contract.address;
        this.options = o;

        return this;
    }

    async matureMarket (u: string, m: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.matureMarket(u, m);
    }

    async redeemZcToken (u: string, m: number, a: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.redeemZcToken(u, m, a);
    }

    async redeemVaultInterest (u: string, m: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.redeemVaultInterest(u, m);
    }

    async calculateReturn (u: string, m: number, a: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.calculateReturn(u, m, a);
    }

    async custodialInitiate (u: string, m: number, z: string, n: string, a: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.custodialInitiate(u, m, z, n, a);
    }

    async custodialExit (u: string, m: number, z: string, n: string, a: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.custodialExit(u, m, z, n, a);
    }

    async p2pZcTokenExchange (u: string, m: number, f: string, t: string, a: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.p2pZcTokenExchange(u, m, f, t, a);
    }

    async p2pVaultExchange (u: string, m: number, f: string, t: string, a: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.p2pVaultExchange(u, m, f, t, a);
    }
}
