import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, CallOverrides, Contract } from 'ethers';
import { VAULT_TRACKER_ABI } from '../constants/index.js';
import { unwrap } from '../helpers/index.js';
import { Protocol, Vault } from '../types/index.js';

/**
 * An internal type solely for vault struct response.
 *
 * @internal
 */
export type VaultResponse = BigNumber[] & {
    notional: BigNumber;
    redeemable: BigNumber;
    exchangeRate: BigNumber;
    accrualBlock: BigNumber;
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
     * Get the associated Swivel contract address.
     *
     * @param t - optional transaction overrides
     */
    async swivel (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.swivel(t));
    }

    /**
     * Get the associated MarketPlace contract address.
     *
     * @param t - optional transaction overrides
     */
    async marketPlace (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.marketPlace(t));
    }

    /**
     * Get the protocol.
     *
     * @param t - optional transaction overrides
     */
    async protocol (t: CallOverrides = {}): Promise<Protocol> {

        return unwrap<number>(await this.contract.functions.protocol(t));
    }

    /**
     * Get the adapter address.
     *
     * @param t - optional transaction overrides
     */
    async adapter (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.adapter(t));
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
     * Get the maturity rate and exchange rate.
     *
     * @remarks
     * If the maturity rate of the vault tracker is 0 (the assiciated market is not matured),
     * then the tuple will contain the exchange rate in both positions.
     *
     * @param t - optional transaction overrides
     * @returns a tuple containing [maturity rate, exchange rate] if maturity rate > 0,
     *          a tuple containing [exchange rate, exchange rate] otherwise
     */
    async rates (t: CallOverrides = {}): Promise<[string, string]> {

        const rates = unwrap<[BigNumber, BigNumber]>(await this.contract.functions.rates(t));

        return [rates[0].toString(), rates[1].toString()];
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
            accrualBlock: vault.accrualBlock.toString(),
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
