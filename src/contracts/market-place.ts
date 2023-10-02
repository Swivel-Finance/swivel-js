import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides } from 'ethers';
import { MARKET_PLACE_ABI } from '../constants/index.js';
import { executeTransaction, getGasLimitAdjustment, TransactionExecutor, unwrap } from '../helpers/index.js';
import { getInterestRate } from '../internal/index.js';
import { RatesConfig } from '../internal/rates/config.js';
import { Market, Protocols } from '../types/index.js';

/**
 * An internal type solely for market struct responses.
 *
 * @internal
 */
export type MarketResponse = unknown[] & {
    cTokenAddr: string;
    zcToken: string;
    vaultTracker: string;
    maturityRate: BigNumber;
};

export class MarketPlace {

    /**
     * Euler's `Markets` contract proxy addresses per chain.
     *
     * @remarks
     * In order to retrieve the interest rate (supply APY) of a Euler market,
     * we need the static proxy address of the `Markets` contract.
     *
     * Should this address change in the future, you can set it via this static
     * property. The index of each entry is the chain id of Euler's Markets
     * contract deployment, currently mainnet and ropsten have deploys.
     *
     * https://docs.euler.finance/protocol/addresses
     */
    static EULER_ADDRESSES: Record<number, Record<'MARKETS', string>> = {
        1: {
            MARKETS: '0x3520d5a913427E6F0D6A83E07ccD4A4da316e4d3',
        },
        3: {
            MARKETS: '0x60Ec84902908f5c8420331300055A63E6284F522',
        },
    };

    protected contract: Contract;

    protected executor: TransactionExecutor;

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
     * @param e - a {@link TransactionExecutor} (can be swapped out, e.g. during testing)
     */
    constructor (a: string, s: Provider | Signer, e: TransactionExecutor = executeTransaction) {

        this.contract = new Contract(a, MARKET_PLACE_ABI, s);
        this.executor = e;
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
     * @param p - protocol enum value associated with the market
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
        //   zcToken: '0xc4a28965e4d852eEeEC492Efbc42d1f92fB741ba',
        //   ...,
        // ]
        const market = await this.contract.functions.markets(p, u, maturity, t) as MarketResponse;

        return {
            cTokenAddr: market.cTokenAddr,
            zcToken: market.zcToken,
            vaultTracker: market.vaultTracker,
            maturityRate: market.maturityRate.toString(),
        };
    }

    /**
     * Get a market's cToken address.
     *
     * @param p - protocol enum value associated with the market
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - optional transaction overrides
     */
    async cTokenAddress (p: Protocols, u: string, m: BigNumberish, t: CallOverrides = {}): Promise<string> {

        const maturity = BigNumber.from(m);

        return unwrap<string>(await this.contract.functions.cTokenAddress(p, u, maturity, t));
    }

    /**
     * Get a market's maturityRate and exchangeRate.
     *
     * @param p - protocol enum value associated with the market
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - optional transaction overrides
     * @returns a tuple containing the maturityRate and exchangeRate of the market
     */
    async rates (p: Protocols, u: string, m: BigNumberish, t: CallOverrides = {}): Promise<[string, string]> {

        const maturity = BigNumber.from(m);

        const rates = unwrap<[BigNumber, BigNumber]>(await this.contract.functions.rates(p, u, maturity, t));

        return [rates[0].toString(), rates[1].toString()];
    }

    /**
     * Retrieve the exchange rate for a lending protocol and cToken/pool using Swivel's ICompounding abstraction.
     *
     * @param p - protocol enum value of the lending protocol associated with a swivel market
     * @param a - address of the market's cToken
     * @param t - optional transaction overrides
     * @returns the exchange rate of the protocol's cToken/pool to underlying (the scale of the value depends on the protocol)
     */
    async exchangeRate (p: Protocols, a: string, t: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.exchangeRate(p, a, t)).toString();
    }

    /**
     * Retrieve the interest rate (supply APY) for a lending protocol and cToken/pool.
     *
     * @param p - protocol enum value of the lending protocol associated with a swivel market
     * @param a - address of the market's cToken
     * @returns the interest rate of the protocol's cToken/pool (as a fraction 1/100%)
     */
    interestRate (p: Protocols, a: string): Promise<string | undefined> {

        const provider = this.contract.provider;

        const config: RatesConfig = {
            Euler: {
                ADDRESSES: (this.constructor as typeof MarketPlace).EULER_ADDRESSES,
            },
        };

        return getInterestRate(p, a, provider, config);
    }

    /**
     * Mature a market after its maturity has been reached.
     *
     * @param p - protocol enum value associated with the market
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - optional transaction overrides
     */
    async matureMarket (p: Protocols, u: string, m: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse> {

        const maturity = BigNumber.from(m);

        return await this.executor(this.contract, 'matureMarket', [p, u, maturity], t);
    }

    /**
     * Transfer a vault's notional.
     *
     * @param p - protocol enum value associated with the market
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param r - receiver to be transferred to
     * @param a - amount of notional to be transferred
     * @param t - optional transaction overrides
     */
    async transferVaultNotional (p: Protocols, u: string, m: BigNumberish, r: string, a: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse> {

        const maturity = BigNumber.from(m);
        const amount = BigNumber.from(a);

        const gasOptimization = getGasLimitAdjustment(p);

        return await this.executor(this.contract, 'transferVaultNotional', [p, u, maturity, r, amount], t, gasOptimization);
    }
}
