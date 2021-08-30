import { CTOKEN_ABI } from './constants';
import { CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED, CONTRACT_INSTANTIATION_FAILED, MISSING_CONTRACT_ADDRESS } from './errors';
import { CTokenContract, TxOptions, TxResponse, uint256, Vendor } from './interfaces';

export class CToken implements CTokenContract {

    protected contract?: CTokenContract;

    protected options?: TxOptions;

    protected abi = CTOKEN_ABI;

    address?: string;

    vendor: Vendor;


    /**
     * Create a new swivel instance
     *
     * @param v - a vendor instance (ethers.js or web3.js vendor)
     */
    constructor (v: Vendor) {

        this.vendor = v;

    }

    /**
     *
     * @param a - ETH address of the already deployed ctoken smart contract
     * @param o - optional transaction options
     *
     * @returns the swivel instance
     */
    at (a: string, o?: TxOptions): CToken {

        this.contract = this.vendor.contracts.ctoken(a, this.abi, o);

        if (!this.contract) throw CONTRACT_INSTANTIATION_FAILED('ctoken', a);

        this.address = this.contract.address;
        this.options = o;

        return this;
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    async allocateTo (t: string, a: uint256): Promise<TxResponse> {

        if (!this.contract) throw MISSING_CONTRACT_ADDRESS('ctoken');

        return await this.contract.allocateTo(t, a);
    }

}
