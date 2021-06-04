import { Contract, Signer } from 'ethers';
import { ABI, Market, MarketplaceContract, TxResponse } from '../../../interfaces';

export class EthersMarketplaceContract implements MarketplaceContract {

    protected contract: Contract;

    address: string;

    /**
     * Creates a new ethers.js specific marketplace contract wrapper.
     *
     * @param address - address of the deployed marketplace contract
     * @param abi - the abi of the marketplace contract
     * @param s - an ethers.js signer instance
     */
    constructor (address: string, abi: ABI, s: Signer) {

        this.contract = new Contract(address, abi, s);
        this.address = this.contract.address;
    }

    /**
     * Retrieve the market information.
     *
     * @param u - underlying token address associated with the market
     */
    async markets (u: string): Promise<Market> {

        return await this.contract.functions.markets(u) as Promise<Market>;
    }

    /**
     * Checks if a market is mature.
     *
     * @param u - underlying token address associated with the market
     */
    async mature (u: string): Promise<boolean> {

        return await this.contract.functions.mature(u) as Promise<boolean>;
    }

    /**
     * Retrieve the market maturity.
     *
     * @param u - underlying token address associated with the market
     */
    async maturityRate (u: string): Promise<number> {

        return await this.contract.functions.maturityRate(u) as Promise<number>;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async matureMarket (u: string, m: number): Promise<TxResponse> {

        return await this.contract.functions.matureMarket(u, m) as Promise<TxResponse>;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param a - amount of zcTokens being redeemed
     */
    async redeemZcToken (u: string, m: number, a: number): Promise<TxResponse> {

        return await this.contract.functions.redeemZcToken(u, m, a) as Promise<TxResponse>;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async redeemVaultInterest (u: string, m: number): Promise<TxResponse> {

        return await this.contract.functions.redeemVaultInterest(u, m) as Promise<TxResponse>;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - target to be transferred to
     * @param a - amount of notional to be transferred
     */
    async transferVaultNotional (u: string, m: number, t: string, a: number): Promise<TxResponse> {

        return await this.contract.functions.transferVaultNotional(u, m, t, a) as Promise<TxResponse>;
    }
}
