import { Contract, Signer } from 'ethers';
import { ABI, MarketplaceContract, TxResponse } from '../../../interfaces';

export class EthersMarketplaceContract implements MarketplaceContract {

    protected contract: Contract;

    address: string;

    constructor (a: string, abi: ABI, s: Signer) {

        this.contract = new Contract(a, abi, s);
        this.address = this.contract.address;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async matureMarket (u: string, m: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async redeemZcToken (u: string, m: number, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async redeemVaultInterest (u: string, m: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async calculateReturn (u: string, m: number, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async custodialInitiate (u: string, m: number, z: string, n: string, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async custodialExit (u: string, m: number, z: string, n: string, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async p2pZcTokenExchange (u: string, m: number, f: string, t: string, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async p2pVaultExchange (u: string, m: number, f: string, t: string, a: number): Promise<TxResponse> {
        throw new Error('Method not implemented.');
    }
}
