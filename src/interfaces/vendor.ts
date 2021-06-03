import { ABI } from './abi';
import { MarketplaceContract, SwivelContract } from './contracts';
import { Order } from './order';
import { TxOptions } from './transaction';

export interface Vendor {

    /**
     * Contract factories for the swivel and marketplace contracts.
     */
    contracts: {
        /**
         * Factory for creating a vendor specific marketplace contract wrapper.
         *
         * @param address - address of the deployed marketplace contract
         * @param abi - the abi of the marketplace contract
         * @param o - optional default transaction options
         */
        marketplace: (address: string, abi: ABI, o?: TxOptions) => MarketplaceContract;
        /**
         * Factory for creating a vendor specific swivel contract wrapper.
         *
         * @param address - address of the deployed swivel contract
         * @param abi - the abi of the swivel contract
         * @param o - optional default transaction options
         */
        swivel: (address: string, abi: ABI, o?: TxOptions) => SwivelContract;
    };

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
    signOrder (o: Order, i: number, c: string): Promise<string>;
}
