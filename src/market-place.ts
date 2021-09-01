import { MARKET_PLACE_ABI } from './constants';
import { CONTRACT_INSTANTIATION_FAILED, MISSING_CONTRACT_ADDRESS } from './errors';
import { Market, MarketPlaceContract, TxOptions, TxResponse, uint256, Vendor } from './interfaces';

export class MarketPlace implements MarketPlaceContract {

    protected contract?: MarketPlaceContract;

    protected options?: TxOptions;

    protected abi = MARKET_PLACE_ABI;

    address?: string;

    vendor: Vendor;

    /**
     * Create a new market place instance
     *
     * @param v - a vendor instance (ethers.js or web3.js vendor)
     */
    constructor (v: Vendor) {

        this.vendor = v;
    }

    /**
     * Set the deployed smart contract address
     *
     * @remarks
     * Creates a vendor specific instance of the deployed market place smart contract
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
     * // create a MarketPlace instance with the EtherVendor instance
     * const marketPlace = new MarketPlace(vendor).at('0x123');
     * ```
     *
     * @param a - ETH address of the deployed market place smart contract
     * @param o - optional transaction options
     *
     * @returns the market place instance
     */
    at (a: string, o?: TxOptions): MarketPlace {

        this.contract = this.vendor.contracts.marketPlace(a, this.abi, o);

        if (!this.contract) throw CONTRACT_INSTANTIATION_FAILED('market-place', a);

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

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('market-place');

        return await this.contract.admin();
    }

    /**
     * Returns the associated swivel contract address.
     */
    async swivel (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('market-place');

        return await this.contract.swivel();
    }

    /**
     * Retrieve the market information.
     *
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async markets (u: string, m: uint256): Promise<Market> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('market-place');

        return await this.contract.markets(u, m);
    }

    /**
     * Checks if a market is mature.
     *
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async mature (u: string, m: uint256): Promise<boolean> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('market-place');

        return await this.contract.mature(u, m);
    }

    /**
     * Retrieve the market maturity.
     *
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async maturityRate (u: string, m: uint256): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('market-place');

        return await this.contract.maturityRate(u, m);
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async matureMarket (u: string, m: uint256): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('market-place');

        return await this.contract.matureMarket(u, m);
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - target to be transferred to
     * @param a - amount of notional to be transferred
     */
    async transferVaultNotional (u: string, m: uint256, t: string, a: uint256): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('market-place');

        return await this.contract.transferVaultNotional(u, m, t, a);
    }
}
