import { Contract, ethers, Signer } from 'ethers';
import { Abi, Order, SwivelContract, TxResponse, uint256 } from '../../../interfaces';
import { fromBigNumber, prepareOrder, splitSignature, toBigNumber, unwrap } from '../utils';

export class EthersCTokenContract implements CTokenContract {

    protected contract: Contract;

    address: string;

    /**
     * Creates a new ethers.js specific swivel contract wrapper.
     *
     * @param address - address of the deployed swivel contract
     * @param abi - the abi of the swivel contract
     * @param s - an ethers.js signer instance
     */
    constructor (address: string, abi: Abi, s: Signer) {

        this.contract = new Contract(address, abi, s);
        this.address = this.contract.address;
    }

    /**
     * @param o - array of offline swivel orders
     * @param a - array of order volume (principal) amounts relative to passed orders
     * @param s - array of valid ECDSA signatures
     */
    async allocateTo (t: string, a: uint256): Promise<TxResponse> {

        const amount = toBigNumber(a);

        return await this.contract.functions.allocateTo(t, amount) as TxResponse;
    }


}
