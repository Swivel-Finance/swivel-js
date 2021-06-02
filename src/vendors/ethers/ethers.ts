import { Provider } from '@ethersproject/abstract-provider';
import { Signer, TypedDataSigner } from '@ethersproject/abstract-signer';
import { domain, TYPES } from '../../constants';
import { ABI, MarketplaceContract, Order, SwivelContract, Vendor } from '../../interfaces';
import { EthersMarketplaceContract, EthersSwivelContract } from './contracts';

export class EthersVendor implements Vendor {

    // TODO: we might not need to cache contract instances on the vendor
    // the swivel and marketplace libs cache them already
    protected marketplace?: MarketplaceContract;

    protected swivel?: SwivelContract;

    provider: Provider;

    signer: Signer;

    contracts = {
        marketplace: (a: string, abi: ABI): MarketplaceContract => {
            this.marketplace = new EthersMarketplaceContract(a, abi, this.signer);
            return this.marketplace;
        },
        swivel: (a: string, abi: ABI): SwivelContract => {
            this.swivel = new EthersSwivelContract(a, abi, this.signer);
            return this.swivel;
        },
    };

    constructor (p: Provider, s: Signer) {

        this.provider = p;
        this.signer = s;
    }

    // TODO: Should the generic Order be signed or the vendor specific EthersOrder?
    async signOrder (o: Order, i: number, c: string): Promise<string> {

        return (this.signer as unknown as TypedDataSigner)._signTypedData(domain(i, c), { Order: TYPES.Order }, o);
    }
}
