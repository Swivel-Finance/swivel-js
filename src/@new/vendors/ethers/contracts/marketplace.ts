import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from '@ethersproject/contracts';
import { ABI, MarketplaceContract, TxResponse } from '../../../interfaces';

export class EthersMarketplaceContract implements MarketplaceContract {

    protected contract: Contract;

    address: string;

    constructor (a: string, abi: ABI, s: Signer) {

        this.contract = new Contract(a, abi, s);
        this.address = this.contract.address;
    }

    async matureMarket (u: string, m: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    async redeemZcToken (u: string, m: number, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    async redeemVaultInterest (u: string, m: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    async calculateReturn (u: string, m: number, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    async custodialInitiate (u: string, m: number, z: string, n: string, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    async custodialExit (u: string, m: number, z: string, n: string, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    async p2pZcTokenExchange (u: string, m: number, f: string, t: string, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    async p2pVaultExchange (u: string, m: number, f: string, t: string, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }
}
