import { VAULT_TRACKER_ABI } from './constants/index.js';
import { CONTRACT_INSTANTIATION_FAILED, MISSING_CONTRACT_ADDRESS } from './errors/index.js';
import { TxOptions, Vault, VaultTrackerContract, Vendor } from './interfaces/index.js';

export class VaultTracker implements VaultTrackerContract {

    protected contract?: VaultTrackerContract;

    protected options?: TxOptions;

    protected abi = VAULT_TRACKER_ABI;

    address?: string;

    vendor: Vendor;

    /**
     * Create a new vault tracker instance
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
     * Creates a vendor specific instance of the deployed vault tracker smart contract
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
     * // create a VaultTracker instance with the EtherVendor instance
     * const vaultTracker = new VaultTracker(vendor).at('0x123');
     * ```
     *
     * @param a - ETH address of the deployed vault tracker smart contract
     * @param o - optional transaction options
     *
     * @returns the vault tracker instance
     */
    at (a: string, o?: TxOptions): VaultTracker {

        this.contract = this.vendor.contracts.vaultTracker(a, this.abi, o);

        if (!this.contract) throw CONTRACT_INSTANTIATION_FAILED('vault-tracker', a);

        this.address = this.contract.address;
        this.options = o;

        return this;
    }

    // ============================
    // Contract getters and methods
    // ============================

    /**
     * Returns the admin address.
     *
     * @remarks
     * This is the marketplace contract address.
     */
    async admin (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault-tracker');

        return await this.contract.admin();
    }

    /**
     * Returns the associated swivel contract address.
     */
    async swivel (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault-tracker');

        return await this.contract.swivel();
    }

    /**
     * Returns the maturity timestamp.
     */
    async maturity (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault-tracker');

        return await this.contract.maturity();
    }

    /**
     * Returns the maturity rate.
     */
    async maturityRate (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault-tracker');

        return await this.contract.maturityRate();
    }

    /**
     * Returns the cToken address.
     */
    async cTokenAddr (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault-tracker');

        return await this.contract.cTokenAddr();
    }

    /**
     * Retrieves the vault for a specific owner.
     *
     * @param o - the owner address
     * @returns a {@link Vault} object
     */
    async vaults (o: string): Promise<Vault> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault-tracker');

        return await this.contract.vaults(o);
    }

    /**
     * Retrieves the notional and redeemable balances for a specific owner.
     *
     * @param o - the owner address
     * @returns a tuple containing the notional and redeemable balance
     */
    async balancesOf (o: string): Promise<[string, string]> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault-tracker');

        return await this.contract.balancesOf(o);
    }
}
