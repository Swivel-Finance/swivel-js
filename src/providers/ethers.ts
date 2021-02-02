// NOTE this is currently a shell for where we will encapsulate ethers.js

import { SIGNER_OR_PROVIDER_REQUIRED } from '../errors'
import { Contract } from '../interfaces'
import Provider from '../abstracts/provider'

// TODO remove this when using acutal ethers
class EthersContract implements Contract {
  public address: string
  
  constructor(a: string) {
    this.address = a
  }
}

export default class extends Provider {
  /**
   * @remarks
   * Given an ethers specific provider and optionally a signer return a Provider.
   * Note that the lower level provider and signer are allowed to be <any>.
   * This we can change to be more specific types, but may not be needed.
   *
   * @param p - An Ethers Provider
   * @param s - Optional Ethers Signer
   */
  constructor(p: any, s?: any) {
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
  contract(address: string, abi: any): Contract {
    this.requireSignerOrProvider() 
    // TODO use actual ethers... `new ethers.Contract(address, abi, this.signer || this.provider)`
    // this is simply to get the repo running...
    return new EthersContract(address)
  }

  /**
   *
   * @remarks
   * Convenience methods which abstracts repetitive checking for the presence of a signer || provider
   */
  requireSignerOrProvider() {
    if ((!this.signer) && (!this.provider)) throw new ReferenceError(SIGNER_OR_PROVIDER_REQUIRED)
  }
}
