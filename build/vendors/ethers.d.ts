import { TypedDataDomain } from '@ethersproject/abstract-signer';
import { Components, Contract, Order } from '../interfaces';
import Vendor from '../abstracts/vendor';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
import { Abi } from '../@types';
import { BigNumber } from 'ethers';
import { ValidOrder } from './interfaces/order';
export default class extends Vendor {
    /**
     * @remarks
     * Given an ethers specific provider and optionally a signer return a Vendor.
     *
     * @param p - An Ethers Provider
     * @param s - Optional Ethers Signer
     */
    constructor(p: Provider, s?: Signer);
    /**
     * @remarks
     * The Ethers.js specific setting of typed data domain.
     *
     * @param i - chain Id
     * @param v - verifying address
     */
    domain(i: number, v: string): TypedDataDomain;
    /**
     * @remarks
     * The Ethers.js specific setting of signer from provider.
     *
     * @param p - raw provider instance
     */
    setSigner(p: any): void;
    /**
     * @remarks
     * The Ethers.js specific implementation of a .contract method.
     *
     * @param address - Address a target contract has been deployed to
     * @param abi - Compiled abi of the deployed target contract
     *
     * @returns Contract
     */
    contract(address: string, abi: Abi): Contract;
    /**
     * @remarks
     * The Ethers.js specific convertion of order.
     *
     * @param o - order that swivel js will get
     *
     * @returns ValidOrder, ethers own type of order
     */
    prepareOrder(o: Order): ValidOrder;
    /**
     * @remarks
     * implementation of signing typed order.
     *
     * @param o - vendor specific order
     * @param i - chainId for the deployed Contract
     * @param v - address of the deployed verifying contract
     */
    signOrder(o: Order, i: number, v: string): Promise<string>;
    /**
     * @remarks
     * implementation of spliting signature.
     *
     * @param s - signature hash string
     */
    splitSignature(s: string): Components;
    /**
     * @remarks
     * The Ethers.js specific convertion of filling amount and agreement key.
     *
     * TODO this name?
     *
     * @param a - filling amount
     */
    prepareFillingAmount(a: string): BigNumber;
    /**
     *
     * @remarks
     * Convenience methods which abstracts repetitive checking for the presence of a signer || provider
     * @private
     */
    private requireSignerOrProvider;
}
//# sourceMappingURL=ethers.d.ts.map