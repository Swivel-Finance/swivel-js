/**
 * @remarks
 * Base class of all Providers for Swivel HOCs. This abstraction should only
 * contain the Methods and properties needed by Swivel HOCs to function.
 * Note that we are referring to third party libs such as Ethers and Web3 as
 * a Provider. This term is negotiable, I just can't think of a better one.
 * The Provider, in turn, keeps a reference to it's own .provider specific to that lib.
 * While this is natural to me, it may be worth discussing different terms if confusing.
 */


import { Keyed, Contract } from '../interfaces'

export default abstract class implements Keyed {
  [key:string]: any
  public provider: any // TODO
  public signer: any // TODO

  /**
   * @remarks
   * Method which instantiates and returns the provider specific contract abstraction. Must be
   * implemented in a child class
   *
   * @param address - Deployed address of the target contract
   * @param abi - Compiled abi of the target contract
   * @param o - Optional transaction options
   *
   */
  abstract contract(address: string, abi: any): Contract
}
