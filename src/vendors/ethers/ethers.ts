import { Provider } from '@ethersproject/abstract-provider';
import { Signer, TypedDataSigner } from '@ethersproject/abstract-signer';
import { domain, TYPES } from '../../constants/index.js';
import { Abi, MarketPlaceContract, Order, SwivelContract, VaultTrackerContract, Vendor } from '../../interfaces/index.js';
import { EthersMarketPlaceContract, EthersSwivelContract, EthersVaultTrackerContract } from './contracts/index.js';

export class EthersVendor implements Vendor {

    provider: Provider;

    signer: Signer;

    contracts = {
        /**
         * Factory for creating an ethers.js specific market place contract wrapper.
         *
         * @param address - address of the deployed market place contract
         * @param abi - the abi of the market place contract
         */
        marketPlace: (address: string, abi: Abi): MarketPlaceContract => {

            return new EthersMarketPlaceContract(address, abi, this.signer);
        },
        /**
         * Factory for creating an ethers.js specific swivel contract wrapper.
         *
         * @param address - address of the deployed swivel contract
         * @param abi - the abi of the swivel contract
         */
        swivel: (address: string, abi: Abi): SwivelContract => {

            return new EthersSwivelContract(address, abi, this.signer);
        },
        /**
         * Factory for creating an ethers.js specific vault tracker contract wrapper.
         *
         * @param address - address of the deployed vault tracker contract
         * @param abi - the abi of the vault tracker contract
         */
        vaultTracker: (address: string, abi: Abi): VaultTrackerContract => {

            return new EthersVaultTrackerContract(address, abi, this.signer);
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

    /**
     * Sign an order using EIP-712.
     *
     * @remarks
     * https://eips.ethereum.org/EIPS/eip-712
     * `_signTypedData` takes care of converting the `Order` properties to the types
     * specified in the `TypedData` metadata object.
     *
     * @param o - order to sign
     * @param i - chain-id for the deployed smart contract
     * @param c - address of a deployed verifying contract
     */
    async signOrder (o: Order, i: number, c: string): Promise<string> {

        return (this.signer as unknown as TypedDataSigner)._signTypedData(domain(i, c), { Order: TYPES.Order }, o);
    }
}
