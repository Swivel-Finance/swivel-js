import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides } from 'ethers';
import { MARKET_PLACE_ABI } from '../constants/index.js';
import { optimizeGas, unwrap } from '../helpers/index.js';
import { Market, Protocols } from '../types/index.js';

/**
 * An internal type solely for market struct responses.
 *
 * @internal
 */
export type MarketResponse = unknown[] & {
    cTokenAddr: string;
    adapterAddr: string;
    zcToken: string;
    vaultTracker: string;
    maturityRate: BigNumber;
};

export class MarketPlace {

    protected contract: Contract;

    /**
     * Get the contract address.
     */
    get address (): string {

        return this.contract.address;
    }

    /**
     * Create a MarketPlace contract instance.
     *
     * @param a - address of the deployed MarketPlace contract
     * @param s - ethers provider or signer (a signer is needed for write methods)
     */
    constructor (a: string, s: Provider | Signer) {

        this.contract = new Contract(a, MARKET_PLACE_ABI, s);
    }

    /**
     * Get the contract's admin address.
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
     * Check if the marketplace is paused.
     *
     * @param t - optional transaction overrides
     */
    async paused (t: CallOverrides = {}): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.paused(t));
    }

    /**
     * Retrieve a market's information.
     *
     * @param p - protocol enum value associated with the market pair
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - optional transaction overrides
     */
    async markets (p: Protocols, u: string, m: BigNumberish, t: CallOverrides = {}): Promise<Market> {

        const maturity = BigNumber.from(m);

        // when a contract returns a struct, ethers.js returns it kinda unwrapped...
        // [
        //   '0x6D7F0754FFeb405d23C51CE938289d4835bE3b14',
        //   '0xc4a28965e4d852eEeEC492Efbc42d1f92fB741ba',
        //   ...,
        //   cTokenAddr: '0x6D7F0754FFeb405d23C51CE938289d4835bE3b14',
        //   adapterAddr: '0xc4a28965e4d852eEeEC492Efbc42d1f92fB741ba',
        //   ...,
        // ]
        const market = await this.contract.functions.markets(p, u, maturity, t) as MarketResponse;

        return {
            cTokenAddr: market.cTokenAddr,
            adapterAddr: market.adapterAddr,
            zcToken: market.zcToken,
            vaultTracker: market.vaultTracker,
            maturityRate: market.maturityRate.toString(),
        };
    }

    // TODO: this method might not remain here...
    /**
     * Get a market's cToken and adapter address.
     *
     * @param p - protocol enum value associated with the market pair
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - optional transaction overrides
     * @returns a tuple containing the cToken and adapter address
     */
    async cTokenAndAdapterAddress (p: Protocols, u: string, m: BigNumberish, t: CallOverrides = {}): Promise<[string, string]> {

        const maturity = BigNumber.from(m);

        return unwrap<[string, string]>(await this.contract.functions.cTokenAndAdapterAddress(p, u, maturity, t));
    }

    /**
     * Mature a market after its maturity has been reached.
     *
     * @param p - protocol enum value associated with the market pair
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - optional transaction overrides
     */
    async matureMarket (p: Protocols, u: string, m: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse> {

        const maturity = BigNumber.from(m);

        return await this.contract.functions.matureMarket(p, u, maturity, t) as TransactionResponse;
    }

    /**
     * Transfer a vault's notional.
     *
     * @param p - protocol enum value associated with the market pair
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param r - receiver to be transferred to
     * @param a - amount of notional to be transferred
     * @param t - optional transaction overrides
     */
    async transferVaultNotional (p: Protocols, u: string, m: BigNumberish, r: string, a: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse> {

        const maturity = BigNumber.from(m);
        const amount = BigNumber.from(a);

        const options = await optimizeGas(t, this.contract, 'transferVaultNotional', p, u, maturity, r, amount);

        return await this.contract.functions.transferVaultNotional(p, u, maturity, r, amount, options) as TransactionResponse;
    }
}
