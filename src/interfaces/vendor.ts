import { ABI } from './abi';
import { MarketplaceContract, SwivelContract } from './contracts';
import { Order } from './order';
import { TxOptions } from './transaction';

export interface Vendor {

    /**
     * Contract factories for the swivel and marketplace contracts.
     */
    contracts: {
        marketplace: (a: string, abi: ABI, o?: TxOptions) => MarketplaceContract;
        swivel: (a: string, abi: ABI, o?: TxOptions) => SwivelContract;
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
