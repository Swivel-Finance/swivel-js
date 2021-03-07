// NOTE this is currently a shell for where we will encapsulate ethers.js

import { SIGNER_OR_PROVIDER_REQUIRED } from '../errors'
import { Components, Contract, Order } from '../interfaces'
import Vendor from '../abstracts/vendor'
import { Signer } from '@ethersproject/abstract-signer'
import { Contract as EthersContract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { Abi } from '../@types'
import { BigNumber, ethers, Signature, utils } from 'ethers'
import { ValidOrder } from './interfaces/order'
import { DOMAIN, TYPES } from '../constants'

export default class extends Vendor {
  /**
   * @remarks
   * Given an ethers specific provider and optionally a signer return a Vendor.
   *
   * @param p - An Ethers Provider
   * @param s - Optional Ethers Signer
   */
  constructor(p: Provider, s?: Signer) {
    super()
    this.provider = p
    this.signer = s
  }

  /**
   * @remarks
   * The Ethers.js specific setting of signer from provider.
   *
   * @param p - raw provider instance
   */
  setSigner(p: any): void {
    const provider = new ethers.providers.Web3Provider(p)
    this.signer = provider.getSigner()
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
  contract(address: string, abi: Abi): Contract {
    this.requireSignerOrProvider()
    return new EthersContract(address, abi, this.signer)
  }

  /**
   * @remarks
   * The Ethers.js specific convertion of order.
   *
   * @param o - order that swivel js will get
   *
   * @returns ValidOrder, ethers own type of order
   */
  prepareOrder(o: Order): ValidOrder {
    return {
      key: utils.arrayify(o.key),
      maker: o.maker,
      underlying: o.underlying,
      floating: o.floating,
      principal: ethers.BigNumber.from(o.principal),
      interest: ethers.BigNumber.from(o.interest),
      duration: ethers.BigNumber.from(o.duration),
      expiry: ethers.BigNumber.from(o.expiry),
    }
  }

  /**
   * @remarks
   * implementation of signing typed order.
   *
   * @param o - vendor specific order
   * @param p - raw provider instance
   */
  async signOrder(o: ValidOrder, p: any): Promise<string> {
    const msgParams = {
      domain: DOMAIN,
      message: o,
      primaryType: 'Order',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Order: TYPES.Order,
      },
    }
    console.log(msgParams)

    return p.request({
      method: 'eth_signTypedData_v4',
      params: [o.maker, JSON.stringify(msgParams)],
    })
  }

  /**
   * @remarks
   * implementation of spliting signature.
   *
   * @param s - signature hash string
   */
  splitSignature(s: string): Components {
    const splitSig: Signature = utils.splitSignature(s)
    const components: Components = {
      v: splitSig.v,
      r: splitSig.r,
      s: splitSig.s,
    }
    components.v = parseInt(components.v + '')
    if (components.v < 27) components.v += 27
    return components
  }

  /**
   * @remarks
   * The Ethers.js specific convertion of filling amount and agreement key.
   *
   * @param a - filling amount
   */
  prepareFillingAmount(a: string): BigNumber {
    return ethers.BigNumber.from(a)
  }

  /**
   *
   * @remarks
   * Convenience methods which abstracts repetitive checking for the presence of a signer || provider
   * @private
   */
  private requireSignerOrProvider() {
    if (!this.signer && !this.provider) throw new ReferenceError(SIGNER_OR_PROVIDER_REQUIRED)
  }
}
