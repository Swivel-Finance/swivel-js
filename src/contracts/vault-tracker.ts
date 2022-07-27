import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, CallOverrides, Contract } from 'ethers';
import { VAULT_TRACKER_ABI } from '../constants/index.js';
import { unwrap } from '../helpers/index.js';
import { Vault } from '../types/index.js';

/**
 * An internal type solely for vault struct response.
 *
 * @internal
 */
export type VaultResponse = BigNumber[] & {
    notional: BigNumber;
    redeemable: BigNumber;
    exchangeRate: BigNumber;
};

export class VaultTracker {

    protected contract: Contract;

    /**
     * Get the contract address.
     */
    get address (): string {

        return this.contract.address;
    }

    /**
     * Create a VaultTracker contract instance.
     *
     * @param a - address of the deployed VaultTracker contract
     * @param p - ethers provider or signer
     */
    constructor (a: string, p: Provider | Signer) {

        this.contract = new Contract(a, VAULT_TRACKER_ABI, p);
    }

    /**
     * Get the contract's admin address.
     *
     * @remarks
     * This is the marketplace contract address.
     *
     * @param t - optional transaction overrides
     */
    async admin (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.admin(t));
    }

    /**
     * Get the associated Swivel contract address.
     *
     * @param t - optional transaction overrides
     */
    async swivel (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.swivel(t));
    }

    /**
     * Get the maturity timestamp.
     *
     * @param t - optional transaction overrides
     */
    async maturity (t: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.maturity(t)).toString();
    }

    /**
     * Get the maturity rate.
     *
     * @param t - optional transaction overrides
     */
    async maturityRate (t: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.maturityRate(t)).toString();
    }

    /**
     * Get the cToken address.
     *
     * @param t - optional transaction overrides
     */
    async cTokenAddr (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.cTokenAddr(t));
    }

    /**
     * Retrieve the vault for a specific owner.
     *
     * @param o - the owner address
     * @param t - optional transaction overrides
     */
    async vaults (o: string, t: CallOverrides = {}): Promise<Vault> {

        // ethers.js returns structs unwrapped
        const vault = await this.contract.functions.vaults(o, t) as VaultResponse;

        return {
            notional: vault.notional.toString(),
            redeemable: vault.redeemable.toString(),
            exchangeRate: vault.exchangeRate.toString(),
        };
    }

    /**
     * Retrieve the notional and redeemable balances for a specific owner.
     *
     * @param o - the owner address
     * @param t - optional transaction overrides
     * @returns a tuple containing the notional and redeemable balance
     */
    async balancesOf (o: string, t: CallOverrides = {}): Promise<[string, string]> {

        // ethers.js returns tuples unwrapped
        const [notional, redeemable] = await this.contract.functions.balancesOf(o, t) as [BigNumber, BigNumber];

        return [notional.toString(), redeemable.toString()];
    }
}
