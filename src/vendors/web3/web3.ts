import Web3 from 'web3';
import { AbstractProvider, provider } from 'web3-core';
import { JsonRpcPayload } from 'web3-core-helpers';
import { domain, TYPES } from '../../constants';
import { Abi, MarketPlaceContract, Order, SwivelContract, TxOptions, VaultTrackerContract, Vendor } from '../../interfaces';

export class Web3Vendor implements Vendor {

    provider: provider;

    web3: Web3;

    contracts = {
        /**
         * Factory for creating a web3.js specific marketplace contract wrapper.
         *
         * @param address - address of the deployed marketplace contract
         * @param abi - the abi of the marketplace contract
         * @param o - optional default transaction options
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        marketPlace: (address: string, abi: Abi, o?: TxOptions): MarketPlaceContract => {
            throw new Error('Method not implemented.');
        },
        /**
         * Factory for creating a web3.js specific swivel contract wrapper.
         *
         * @param address - address of the deployed swivel contract
         * @param abi - the abi of the swivel contract
         * @param o - optional default transaction options
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        swivel: (address: string, abi: Abi, o?: TxOptions): SwivelContract => {
            throw new Error('Method not implemented.');
        },
        /**
         * Factory for creating a web3.js specific vault tracker contract wrapper.
         *
         * @param address - address of the deployed vault tracker contract
         * @param abi - the abi of the vault tracker contract
         * @param o - optional default transaction options
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        vaultTracker: (address: string, abi: Abi, o?: TxOptions): VaultTrackerContract => {
            throw new Error('Method not implemented.');
        },
    };

    /**
     * Creates a new web3.js vendor object.
     *
     * @param p - a web3.js provider instance to use
     */
    constructor (p: provider) {

        this.provider = p;
        this.web3 = new Web3(p);
    }

    /**
     * Sign an order using EIP-712.
     *
     * @remarks
     * https://eips.ethereum.org/EIPS/eip-712
     *
     * @param o - order to sign
     * @param i - chain-id for the deployed smart contract
     * @param c - address of a deployed verifying contract
     */
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
