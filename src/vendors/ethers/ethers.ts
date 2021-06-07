import { Provider } from '@ethersproject/abstract-provider';
import { Signer, TypedDataSigner } from '@ethersproject/abstract-signer';
import { domain, TYPES } from '../../constants';
import { Abi, MarketplaceContract, Order, SwivelContract, Vendor } from '../../interfaces';
import { EthersMarketplaceContract, EthersSwivelContract } from './contracts';

export class EthersVendor implements Vendor {

    // TODO: we might not need to cache contract instances on the vendor
    // the swivel and marketplace libs cache them already
    protected marketplace?: MarketplaceContract;

    protected swivel?: SwivelContract;

    provider: Provider;

    signer: Signer;

    contracts = {
        /**
         * Factory for creating an ethers.js specific marketplace contract wrapper.
         *
         * @param address - address of the deployed marketplace contract
         * @param abi - the abi of the marketplace contract
         */
        marketplace: (address: string, abi: Abi): MarketplaceContract => {
            this.marketplace = new EthersMarketplaceContract(address, abi, this.signer);
            return this.marketplace;
        },
        /**
         * Factory for creating an ethers.js specific swivel contract wrapper.
         *
         * @param address - address of the deployed swivel contract
         * @param abi - the abi of the swivel contract
         */
        swivel: (address: string, abi: Abi): SwivelContract => {
            this.swivel = new EthersSwivelContract(address, abi, this.signer);
            return this.swivel;
        },
    };

    /**
     * Creates a new ethers.js vendor object.
     *
     * @param p - an ethers.js provider instance to use
     * @param s - an ethers.js signer instance to use
     */
    constructor (p: Provider, s: Signer) {

        this.provider = p;
        this.signer = s;
    }

    // TODO: Should the generic Order be signed or the vendor specific EthersOrder?
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

        return (this.signer as unknown as TypedDataSigner)._signTypedData(domain(i, c), { Order: TYPES.Order }, o);
    }
}
