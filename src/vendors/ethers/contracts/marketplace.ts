import { Contract, Signer } from 'ethers';
import { Abi, Market, MarketplaceContract, TxResponse } from '../../../interfaces';
import { unwrap } from '../utils';

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
    constructor (address: string, abi: Abi, s: Signer) {

        this.contract = new Contract(address, abi, s);
        this.address = this.contract.address;
    }

    /**
     * Returns the admin address.
     */
    async admin (): Promise<string> {

        return unwrap<string>(await this.contract.functions.admin());
    }

    /**
     * Returns the associated swivel contract address.
     */
    async swivel (): Promise<string> {

        return unwrap<string>(await this.contract.functions.swivel());
    }

    /**
     * Retrieve the market information.
     *
     * @param u - underlying token address associated with the market
     */
    async markets (u: string): Promise<Market> {

        return unwrap<Market>(await this.contract.functions.markets(u));
    }

    /**
     * Checks if a market is mature.
     *
     * @param u - underlying token address associated with the market
     */
    async mature (u: string): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.mature(u));
    }

    /**
     * Retrieve the market maturity.
     *
     * @param u - underlying token address associated with the market
     */
    async maturityRate (u: string): Promise<number> {

        // TODO: this returns a uint256 which might be returned as `BigNumber`
        return unwrap<number>(await this.contract.functions.maturityRate(u));
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async matureMarket (u: string, m: number): Promise<TxResponse> {

        return await this.contract.functions.matureMarket(u, m) as TxResponse;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param a - amount of zcTokens being redeemed
     */
    async redeemZcToken (u: string, m: number, a: number): Promise<TxResponse> {

        return await this.contract.functions.redeemZcToken(u, m, a) as TxResponse;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async redeemVaultInterest (u: string, m: number): Promise<TxResponse> {

        return await this.contract.functions.redeemVaultInterest(u, m) as TxResponse;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - target to be transferred to
     * @param a - amount of notional to be transferred
     */
    async transferVaultNotional (u: string, m: number, t: string, a: number): Promise<TxResponse> {

        return await this.contract.functions.transferVaultNotional(u, m, t, a) as TxResponse;
    }
}
