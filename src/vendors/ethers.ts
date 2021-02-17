// NOTE this is currently a shell for where we will encapsulate ethers.js

import { SIGNER_OR_PROVIDER_REQUIRED } from '../errors'
import { Components, Contract, Order } from '../interfaces'
import Vendor from '../abstracts/vendor'
import { Signer } from '@ethersproject/abstract-signer'
import { Contract as EthersContract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { Abi } from '../@types'
import { ethers, Signature, utils } from 'ethers'
import { OrderMeta, ValidOrder } from './interfaces/order'
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
   * @returns EthersOrder, ethers own type of order
   */
  prepareOrder(o: Order): ValidOrder {
    return {
      key: utils.formatBytes32String(o.key),
      maker: o.maker,
      underlying: o.underlying,
      floating: o.floating,
      principal: ethers.BigNumber.from(o.principal),
      interest: ethers.BigNumber.from(o.interest),
      duration: ethers.BigNumber.from(o.duration),
      expiry: ethers.BigNumber.from(o.expiry),
      nonce: ethers.BigNumber.from(o.nonce),
    }
  }

  async signOrder(o: ValidOrder): Promise<string> {
    return this.signer._signTypedData(DOMAIN, TYPES, o)
  }

  splitSign(s: string): Components {
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

  prepareOrderMeta(a: string, k: string): OrderMeta {
    return {
      filling: ethers.BigNumber.from(a),
      agreementKey: ethers.utils.formatBytes32String(k),
    }
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
