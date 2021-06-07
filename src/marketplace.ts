import { MARKETPLACE_ABI } from './constants';
import { CONTRACT_INSTANTIATION_FAILED, MISSING_CONTRACT_ADDRESS } from './errors';
import { Market, MarketplaceContract, TxOptions, TxResponse, Vendor } from './interfaces';

export class Marketplace implements MarketplaceContract {

    protected contract?: MarketplaceContract;

    protected options?: TxOptions;

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

    // ============================
    // Contract getters and methods
    // ============================

    /**
     * Returns the admin address.
     */
    async admin (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.admin();
    }

    /**
     * Returns the associated swivel contract address.
     */
    async swivel (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.swivel();
    }

    /**
     * Retrieve the market information.
     *
     * @param u - underlying token address associated with the market
     */
    async markets (u: string): Promise<Market> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.markets(u);
    }

    /**
     * Checks if a market is mature.
     *
     * @param u - underlying token address associated with the market
     */
    async mature (u: string): Promise<boolean> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.mature(u);
    }

    /**
     * Retrieve the market maturity.
     *
     * @param u - underlying token address associated with the market
     */
    async maturityRate (u: string): Promise<number> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.maturityRate(u);
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async matureMarket (u: string, m: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.matureMarket(u, m);
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param a - amount of zcTokens being redeemed
     */
    async redeemZcToken (u: string, m: number, a: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.redeemZcToken(u, m, a);
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async redeemVaultInterest (u: string, m: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.redeemVaultInterest(u, m);
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - target to be transferred to
     * @param a - amount of notional to be transferred
     */
    async transferVaultNotional (u: string, m: number, t: string, a: number): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('marketplace');

        return await this.contract.transferVaultNotional(u, m, t, a);
    }
}
