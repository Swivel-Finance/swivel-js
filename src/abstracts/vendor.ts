/**
 * @remarks
 * Base class of all Vendors for Swivel HOCs. This abstraction should only
 * contain the Methods and properties needed by Swivel HOCs to function.
 * Note that we are referring to third party libs such as Ethers and Web3 as
 * The Vendor, in turn, keeps a reference to it's own .provider specific to that lib.
 * While this is natural to me, it may be worth discussing different terms if confusing.
 */

import { Keyed, Contract, TransactOpts, Order, Components, VendorOrder } from '../interfaces'
import { Abi } from '../@types'

export default abstract class implements Keyed {
  [key: string]: any
  public provider: any // TODO
  public signer: any // TODO

  /**
   * @remarks
   * Method which instantiates and returns the vendor specific contract abstraction. Must be
   * implemented in a child class
   *
   * @param address - Deployed address of the target contract
   * @param abi - Compiled abi of the target contract
   * @param o - Optional transaction options
   *
   */
  abstract contract(address: string, abi: Abi, o?: TransactOpts): Contract

  /**
   * @remarks
   * Method which sets the vendor specific signer with a raw provider
   *
   * @param p - raw provider
   */
  abstract setSigner(p: any): void

  /**
   * @remarks
   * Method which instantiates and returns the vendor specific order object. Must be
   * implemented in a child class
   *
   * @param o - higher level order object
   *
   */
  abstract prepareOrder(o: Order): VendorOrder

  /**
   * @remarks
   * Method which instantiates and returns the vendor specific signature. Must be
   * implemented in a child class
   *
   * @param o - vendor order object
   * @param p - raw provider
   *
   */
  abstract signOrder(o: VendorOrder, p: any): Promise<string>

  /**
   * @remarks
   * Method which instantiates and returns the vendor specific signature spliting. Must be
   * implemented in a child class
   *
   * @param s - signature
   *
   */
  abstract splitSignature(s: string): Components

  /**
   * @remarks
   * Method which instantiates and returns the vendor specific filling amount. Must be
   * implemented in a child class
   *
   * @param a - filling amount
   *
   */
  abstract prepareFillingAmount(a: string): any
}
