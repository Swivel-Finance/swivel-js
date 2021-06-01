import { Contract } from '@ethersproject/contracts';
import { EthersMarketplaceContract, EthersSwivelContract, Marketplace, Swivel } from '../src';

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
    marketplace: {
        ethers: {
            getWrappedContract (s: Marketplace): EthersMarketplaceContract {
                return (s as unknown as HasContract<EthersMarketplaceContract>).contract;
            },
            getVendorContract (s: Marketplace): Contract {
                return (this.getWrappedContract(s) as unknown as HasContract<Contract>).contract;
            },
        },
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
