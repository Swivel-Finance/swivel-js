// NOTE this is currently a shell for where we will encapsulate ethers.js
import { SIGNER_OR_PROVIDER_REQUIRED } from '../errors';
import Vendor from '../abstracts/vendor';
import { Contract as EthersContract } from '@ethersproject/contracts';
import { ethers, utils } from 'ethers';
import { DOMAIN_NAME, DOMAIN_VERSION, TYPES } from '../constants';
export default class extends Vendor {
    /**
     * @remarks
     * Given an ethers specific provider and optionally a signer return a Vendor.
     *
     * @param p - An Ethers Provider
     * @param s - Optional Ethers Signer
     */
    constructor(p, s) {
        super();
        this.provider = p;
        this.signer = s;
    }
    /**
     * @remarks
     * The Ethers.js specific setting of typed data domain.
     *
     * @param i - chain Id
     * @param v - verifying address
     */
    domain(i, v) {
        return {
            name: DOMAIN_NAME,
            version: DOMAIN_VERSION,
            chainId: i,
            verifyingContract: v,
        };
    }
    /**
     * @remarks
     * The Ethers.js specific setting of signer from provider.
     *
     * @param p - raw provider instance
     */
    setSigner(p) {
        const provider = new ethers.providers.Web3Provider(p);
        this.signer = provider.getSigner();
    }
    /**
     * @remarks
     * The Ethers.js specific implementation of a .contract method.
     *
     * @param address - Address a target contract has been deployed to
     * @param abi - Compiled abi of the deployed target contract
     *
     * @returns Contract
     */
    contract(address, abi) {
        this.requireSignerOrProvider();
        return new EthersContract(address, abi, this.signer);
    }
    /**
     * @remarks
     * The Ethers.js specific convertion of order.
     *
     * @param o - order that swivel js will get
     *
     * @returns ValidOrder, ethers own type of order
     */
    prepareOrder(o) {
        return {
            key: utils.arrayify(o.key),
            maker: o.maker,
            underlying: o.underlying,
            vault: o.vault,
            exit: o.exit,
            principal: ethers.BigNumber.from(o.principal),
            premium: ethers.BigNumber.from(o.premium),
            maturity: ethers.BigNumber.from(o.maturity),
            expiry: ethers.BigNumber.from(o.expiry),
        };
    }
    /**
     * @remarks
     * implementation of signing typed order.
     *
     * @param o - vendor specific order
     * @param i - chainId for the deployed Contract
     * @param v - address of the deployed verifying contract
     */
    async signOrder(o, i, v) {
        return this.signer._signTypedData(this.domain(i, v), TYPES, o);
    }
    /**
     * @remarks
     * implementation of spliting signature.
     *
     * @param s - signature hash string
     */
    splitSignature(s) {
        const splitSig = utils.splitSignature(s);
        const components = {
            v: splitSig.v,
            r: splitSig.r,
            s: splitSig.s,
        };
        components.v = parseInt(components.v + '');
        if (components.v < 27)
            components.v += 27;
        return components;
    }
    /**
     * @remarks
     * The Ethers.js specific convertion of filling amount and agreement key.
     *
     * TODO this name?
     *
     * @param a - filling amount
     */
    prepareFillingAmount(a) {
        return ethers.BigNumber.from(a);
    }
    /**
     *
     * @remarks
     * Convenience methods which abstracts repetitive checking for the presence of a signer || provider
     * @private
     */
    requireSignerOrProvider() {
        if (!this.signer && !this.provider)
            throw new ReferenceError(SIGNER_OR_PROVIDER_REQUIRED);
    }
}
//# sourceMappingURL=ethers.js.map