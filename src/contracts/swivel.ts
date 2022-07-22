import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer, TypedDataSigner } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides, utils } from 'ethers';
import { SWIVEL_ABI, TYPES } from '../constants/index.js';
import { domain, optimizeGas, parseOrder, unwrap } from '../helpers/index.js';
import { Order, Protocols } from '../types/index.js';

export class Swivel {

    /**
     * Sign an order using EIP-712.
     *
     * @remarks
     * https://eips.ethereum.org/EIPS/eip-712
     * `_signTypedData` takes care of converting the `Order` properties to the types
     * specified in the `TypedData` metadata object.
     *
     * @param o - order to sign
     * @param s - an ethers signer to sign the order with
     * @param a - address of the deployed swivel contract that will execute the order
     * @param c - chain id of the deployed swivel contract that will execute the order
     */
    static async signOrder (o: Order, s: Signer, a: string, c: number): Promise<string> {

        return (s as unknown as TypedDataSigner)._signTypedData(domain(c, a), { Order: TYPES.Order }, o);
    }

    protected contract: Contract;

    /**
     * Get the contract address.
     */
    get address (): string {

        return this.contract.address;
    }

    /**
     * Create a Swivel contract instance.
     *
     * @param a - address of the deployed Swivel contract
     * @param s - ethers signer (a signer is needed for write methods and signing orders)
     */
    constructor (a: string, s: Signer) {

        this.contract = new Contract(a, SWIVEL_ABI, s);
    }

    /**
     * Get the name of the signing domain.
     *
     * @remarks
     * Used for EIP-712 typed data signing.
     *
     * @param t - optional transaction overrides
     */
    async NAME (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.NAME(t));
    }

    /**
     * Get the current major version of the signing domain.
     *
     * @remarks
     * Used for EIP-712 typed data signing.
     *
     * @param t - optional transaction overrides
     */
    async VERSION (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.VERSION(t));
    }

    /**
     * Get the hold period.
     *
     * @remarks
     * This is the period between scheduling a withdrawal and when the
     * withdrawal will actually happen. (3 days by default)
     *
     * @param t - optional transaction overrides
     */
    async HOLD (t: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.HOLD(t)).toString();
    }

    /**
     * Get the minimum feenominator.
     *
     * @param t - optional transaction overrides
     */
    async MIN_FEENOMINATOR (t: CallOverrides = {}): Promise<number> {

        return unwrap<number>(await this.contract.functions.MIN_FEENOMINATOR(t));
    }

    /**
     * Get the domain type hash.
     *
     * @remarks
     * Used for EIP-712 typed data signing.
     *
     * @param t - optional transaction overrides
     */
    async domain (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.domain(t));
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
     * Get the contract's marketplace address.
     *
     * @param t - optional transaction overrides
     */
    async marketPlace (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.marketPlace(t));
    }

    /**
     * Get Swivel's Aave contract address.
     *
     * @param t - optional transaction overrides
     */
    async aaveAddr (t: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.aaveAddr(t));
    }

    /**
     * Get the feenominators for [zcTokenInitiate, zcTokenExit, vaultInitiate, vaultExit].
     *
     * @param t - optional transaction overrides
     */
    async feenominators (t: CallOverrides = {}): Promise<[number, number, number, number]> {

        return unwrap<[number, number, number, number]>(await this.contract.functions.feenominators(t));
    }

    /**
     * Check if an order was cancelled.
     *
     * @param k - the key of the order
     * @param t - optional transaction overrides
     */
    async cancelled (k: string, t: CallOverrides = {}): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.cancelled(k, t));
    }

    /**
     * Retrieve an order's filled volume.
     *
     * @param k - the key of the order
     * @param t - optional transaction overrides
     */
    async filled (k: string, t: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.filled(k, t)).toString();
    }

    /**
     * Retrieve a token's hold after which a withdrawal can be made.
     *
     * @param a - the token address
     * @param t - optional transaction overrides
     */
    async withdrawals (a: string, t: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.withdrawals(a, t)).toString();
    }

    /**
     * Retrieve a token's hold after which an approval can be made.
     *
     * @param a - the token address
     * @param t - optional transaction overrides
     */
    async approvals (a: string, t: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.approvals(a, t)).toString();
    }

    /**
     * Initiate a position on the marketplace by filling signed (exit) orders with respective amounts.
     *
     * @param o - array of swivel orders
     * @param a - array of order volumes/amounts relative to passed orders
     * @param s - array of valid ECDSA signatures relative to passed orders
     * @param t - optional transaction overrides
     */
    async initiate (o: Order[], a: BigNumberish[], s: SignatureLike[], t: PayableOverrides = {}): Promise<TransactionResponse> {

        const orders = o.map(order => parseOrder(order));
        const amounts = a.map(amount => BigNumber.from(amount));
        const signatures = s.map(signature => utils.splitSignature(signature));

        const options = await optimizeGas(t, this.contract, 'initiate', orders, amounts, signatures);

        return await this.contract.functions.initiate(orders, amounts, signatures, options) as TransactionResponse;
    }

    /**
     * Exit a position on the marketplace by filling signed (initiate) orders with respective amounts.
     *
     * @param o - array of swivel orders
     * @param a - array of order volumes/amounts relative to passed orders
     * @param s - array of valid ECDSA signatures relative to passed orders
     * @param t - optional transaction overrides
     */
    async exit (o: Order[], a: BigNumberish[], s: SignatureLike[], t: PayableOverrides = {}): Promise<TransactionResponse> {

        const orders = o.map(order => parseOrder(order));
        const amounts = a.map(amount => BigNumber.from(amount));
        const signatures = s.map(signature => utils.splitSignature(signature));

        const options = await optimizeGas(t, this.contract, 'exit', orders, amounts, signatures);

        return await this.contract.functions.exit(orders, amounts, signatures, options) as TransactionResponse;
    }

    /**
     * Cancel an order.
     *
     * @param o - swivel order
     * @param s - valid ECDSA signature
     * @param t - optional transaction overrides
     */
    async cancel (o: Order, s: SignatureLike, t: PayableOverrides = {}): Promise<TransactionResponse> {

        const order = parseOrder(o);
        const signature = utils.splitSignature(s);

        return await this.contract.functions.cancel(order, signature, t) as TransactionResponse;
    }

    /**
     * Desposit underlying into Swivel and receive the minted zcTokens and nTokens.
     *
     * @param p - protocol enum value associated with the market pair
     * @param u - underlying address
     * @param m - maturity timestamp
     * @param a - amount to split
     * @param t - optional transaction overrides
     */
    async splitUnderlying (p: Protocols, u: string, m: BigNumberish, a: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse> {

        const maturity = BigNumber.from(m);
        const amount = BigNumber.from(a);

        const options = await optimizeGas(t, this.contract, 'splitUnderlying', p, u, maturity, amount);

        return await this.contract.functions.splitUnderlying(p, u, maturity, amount, options) as TransactionResponse;
    }

    /**
     * Burn 1-1 amounts of zcTokens and nTokens and receive the redeemed underlying.
     *
     * @param p - protocol enum value associated with the market pair
     * @param u - underlying address
     * @param m - maturity timestamp
     * @param a - amount to combine
     * @param t - optional transaction overrides
     */
    async combineTokens (p: Protocols, u: string, m: BigNumberish, a: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse> {

        const maturity = BigNumber.from(m);
        const amount = BigNumber.from(a);

        const options = await optimizeGas(t, this.contract, 'combineTokens', p, u, maturity, amount);

        return await this.contract.functions.combineTokens(p, u, maturity, amount, options) as TransactionResponse;
    }

    /**
     * Redeem zcTokens at market maturity and receive the redeemed underlying.
     *
     * @param p - protocol enum value associated with the market pair
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param a - amount of zcTokens being redeemed
     * @param t - optional transaction overrides
     */
    async redeemZcToken (p: Protocols, u: string, m: BigNumberish, a: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse> {

        const maturity = BigNumber.from(m);
        const amount = BigNumber.from(a);

        return await this.contract.functions.redeemZcToken(p, u, maturity, amount, t) as TransactionResponse;
    }

    /**
     * Redeem any currently accrued interest.
     *
     * @param p - protocol enum value associated with the market pair
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - optional transaction overrides
     */
    async redeemVaultInterest (p: Protocols, u: string, m: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse> {

        const maturity = BigNumber.from(m);

        const options = await optimizeGas(t, this.contract, 'redeemVaultInterest', p, u, maturity);

        return await this.contract.functions.redeemVaultInterest(p, u, maturity, options) as TransactionResponse;
    }

    /**
     * Sign an order using EIP-712.
     *
     * @remarks
     * https://eips.ethereum.org/EIPS/eip-712
     * `_signTypedData` takes care of converting the `Order` properties to the types
     * specified in the `TypedData` metadata object.
     *
     * @param o - order to sign
     */
    async signOrder (o: Order): Promise<string> {

        const signer = this.contract.signer;
        const provider = signer.provider;

        if (!provider) throw new Error('Unable to sign order: signer is not connected to a provider.');

        const network = await provider.getNetwork();
        const chain = network.chainId;
        const adddress = this.address;

        return (this.constructor as typeof Swivel).signOrder(o, signer, adddress, chain);
    }
}
