import { Contract, Signer } from 'ethers';
import { ABI, Market, MarketplaceContract, TxResponse } from '../../../interfaces';

export class EthersMarketplaceContract implements MarketplaceContract {

    protected contract: Contract;

    address: string;

    constructor (a: string, abi: ABI, s: Signer) {

        this.contract = new Contract(a, abi, s);
        this.address = this.contract.address;
    }

    async markets (u: string): Promise<Market> {

        return await this.contract.functions.markets(u) as Promise<Market>;
    }

    async mature (u: string): Promise<boolean> {

        return await this.contract.functions.mature(u) as Promise<boolean>;
    }

    async maturityRate (u: string): Promise<number> {

        return await this.contract.functions.maturityRate(u) as Promise<number>;
    }

    async matureMarket (u: string, m: number): Promise<TxResponse> {

        return await this.contract.functions.matureMarket(u, m) as Promise<TxResponse>;
    }

    async redeemZcToken (u: string, m: number, a: number): Promise<TxResponse> {

        return await this.contract.functions.redeemZcToken(u, m, a) as Promise<TxResponse>;
    }

    async redeemVaultInterest (u: string, m: number): Promise<TxResponse> {

        return await this.contract.functions.redeemVaultInterest(u, m) as Promise<TxResponse>;
    }

    async transferVaultNotional (u: string, m: number, t: string, a: number): Promise<TxResponse> {

        return await this.contract.functions.transferVaultNotional(u, m, t, a) as Promise<TxResponse>;
    }
}
