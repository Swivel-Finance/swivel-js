import { Contract } from '@ethersproject/contracts';
import { MarketPlace, Swivel, VaultTracker } from '../src';
import { EthersMarketPlaceContract, EthersSwivelContract, EthersVaultTrackerContract } from '../src/vendors/ethers';

interface HasContract<TContract> {
    contract: TContract;
}

export const TEST_HELPERS = {
    swivel: {
        ethers: {
            // the vendor specific contract wrapper is not exposed by swivel
            // to access it during tests, we need to access a protected property
            // as protected properties are only meaningful to TypeScript, we can do some type-casting
            getWrappedContract (s: Swivel): EthersSwivelContract {
                return (s as unknown as HasContract<EthersSwivelContract>).contract;
            },
            getVendorContract (s: Swivel): Contract {
                return (this.getWrappedContract(s) as unknown as HasContract<Contract>).contract;
            },
            stubVendorContract (s: Swivel): Contract {
                const stubbableContract = clone(this.getVendorContract(s)) as Contract;
                (this.getWrappedContract(s) as unknown as HasContract<Contract>).contract = stubbableContract;
                return stubbableContract;
            },
        },
        web3: {},
    },
    marketPlace: {
        ethers: {
            // the vendor specific contract wrapper is not exposed by market place
            // to access it during tests, we need to access a protected property
            // as protected properties are only meaningful to TypeScript, we can do some type-casting
            getWrappedContract (m: MarketPlace): EthersMarketPlaceContract {
                return (m as unknown as HasContract<EthersMarketPlaceContract>).contract;
            },
            getVendorContract (m: MarketPlace): Contract {
                return (this.getWrappedContract(m) as unknown as HasContract<Contract>).contract;
            },
            stubVendorContract (m: MarketPlace): Contract {
                const stubbableContract = clone(this.getVendorContract(m)) as Contract;
                (this.getWrappedContract(m) as unknown as HasContract<Contract>).contract = stubbableContract;
                return stubbableContract;
            },
        },
    },
    vaultTracker: {
        ethers: {
            // the vendor specific contract wrapper is not exposed by vault tracker
            // to access it during tests, we need to access a protected property
            // as protected properties are only meaningful to TypeScript, we can do some type-casting
            getWrappedContract (v: VaultTracker): EthersVaultTrackerContract {
                return (v as unknown as HasContract<EthersVaultTrackerContract>).contract;
            },
            getVendorContract (v: VaultTracker): Contract {
                return (this.getWrappedContract(v) as unknown as HasContract<Contract>).contract;
            },
            stubVendorContract (v: VaultTracker): Contract {
                const stubbableContract = clone(this.getVendorContract(v)) as Contract;
                (this.getWrappedContract(v) as unknown as HasContract<Contract>).contract = stubbableContract;
                return stubbableContract;
            },
        },
        web3: {},
    },
};


/**
 * By cloning an object, we can make a frozen or non-configurable object configurable again.
 *
 * @param o - the object to clone
 * @returns a configurable clone of the object
 */
export function clone (o: unknown): unknown {

    if (Array.isArray(o)) {

        return o.map(item => clone(item));
    }

    if (typeof o === 'object' && o !== null) {

        const result: Record<string, unknown> = {};

        for (const key in o) {

            result[key] = clone(o[key as keyof typeof o]);
        }

        return result;
    }

    return o;
}
