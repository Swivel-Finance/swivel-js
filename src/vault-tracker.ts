import { VAULT_TRACKER_ABI } from './constants';
import { CONTRACT_INSTANTIATION_FAILED, MISSING_CONTRACT_ADDRESS } from './errors';
import { TxOptions, TxResponse, Vault, VaultTrackerContract, Vendor } from './interfaces';

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
     * const ethersProvider = getDefaultProvider();
     * const signer = Wallet.createRandom().connect(ethersProvider);
     * const vendor = new EthersVendor(ethersProvider, signer);
     * const vaultTracker = new VaultTracker(vendor).at('0xabc');
     * ```
     *
     * @param a - ETH address of the deployed vault tracker smart contract
     * @param o - optional transaction options
     *
     * @returns the vault tracker instance for chaining
     */
    at (a: string, o?: TxOptions): VaultTracker {

        this.contract = this.vendor.contracts.vaultTracker(a, this.abi, o);

        if (!this.contract) throw CONTRACT_INSTANTIATION_FAILED('vault tracker', a);

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

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault tracker');

        return await this.contract.admin();
    }

    /**
     * Returns the maturity timestamp.
     */
    async maturity (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault tracker');

        return await this.contract.maturity();
    }

    /**
     * Checks if the maturity date is reached.
     */
    async matured (): Promise<boolean> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault tracker');

        return await this.contract.matured();
    }

    /**
     * Returns the maturity rate.
     */
    async maturityRate (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault tracker');

        return await this.contract.maturityRate();
    }

    /**
     * Returns the cToken address.
     */
    async cTokenAddr (): Promise<string> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault tracker');

        return await this.contract.cTokenAddr();
    }

    /**
     * Retrieves the vault for a specific owner.
     *
     * @param o - the owner address
     * @returns a {@link Vault} object
     */
    async vaults (o: string): Promise<Vault> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault tracker');

        return await this.contract.vaults(o);
    }

    /**
     * Retrieves the notional and redeemable balances for a specific owner.
     *
     * @param o - the owner address
     * @returns a tuple containing the notional and redeemable balance
     */
    async balancesOf (o: string): Promise<[string, string]> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault tracker');

        return await this.contract.balancesOf(o);
    }

    /**
     * Matures a vault.
     */
    async matureVault (): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('vault tracker');

        return await this.contract.matureVault();
    }
}
