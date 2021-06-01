import Web3 from 'web3';
import { AbstractProvider, provider } from 'web3-core';
import { JsonRpcPayload } from 'web3-core-helpers';
import { domain, TYPES } from '../../constants';
import { ABI, MarketplaceContract, Order, SwivelContract, Vendor } from '../../interfaces';

export class Web3Vendor implements Vendor {

    provider: provider;

    web3: Web3;

    contracts = {
        marketplace: (a: string, abi: ABI): MarketplaceContract => {
            throw new Error('Method not implemented.');
        },
        swivel: (a: string, abi: ABI): SwivelContract => {
            throw new Error('Method not implemented.');
        },
    };

    constructor (p: provider) {

        this.provider = p;
        this.web3 = new Web3(p);
    }

    async signOrder (o: Order, i: number, c: string): Promise<string> {

        // TODO: check how to get the correct account
        const accounts = await this.web3.eth.getAccounts();
        const from = accounts[0];

        const method = 'eth_signTypedData_v4';
        const params = [
            from,
            {
                types: TYPES,
                primaryType: 'Order',
                domain: domain(i, c),
                message: o,
            },
        ];
        const payload: JsonRpcPayload = {
            jsonrpc: '2.0',
            method,
            params,
        };

        let resolve: (value: string) => void;
        let reject: (reason?: unknown) => void;

        const result = new Promise<string>((res, rej) => {
            resolve = res;
            reject = rej;
        });

        // TODO: not sure if assuming AbstractProvider is correct:
        // HttpProvider, IpcProvider, WebsocketProvider don't seem to have `sendAsync` method...
        // signature returned from RPC call seems to be a hash, not a signature with components
        // this could help with that:
        // https://github.com/ethereumjs/ethereumjs-util/blob/master/docs/modules/_signature_.md#const-fromrpcsig
        (this.web3.currentProvider as AbstractProvider).sendAsync(
            payload,
            (error, response) => {

                if (error) reject(error);

                else if (response?.error) reject(response.error);

                else resolve(response?.result as string);
            },
        );

        return result;
    }
}
