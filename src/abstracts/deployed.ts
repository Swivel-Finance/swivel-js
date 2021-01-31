/**
 * @remarks
 * Base class of all Higher Order Contracts (HOCs).
 * Note that we do not want to couple this class to any specific Provider.
 */

import { OWNER_REQUIRED } from '../errors'
import { Keyed, TransactOpts } from '../interfaces'
import { Contract, Provider } from '../abstracts'

export default abstract class implements Keyed {
  [key:string]: any
  public owner?: string
  public address?: string
  public abi?: any
  public provider: Provider
  public contract?: Contract

  /**
   * @remarks
   * We dictate that argument names be one letter if possible in typed languages
   *
   * @param a - Compiled abi of the smart contract this HOC wraps
   * @param o - Optional ETH account address of the contract's owner
   */
  constructor(a: any, o?: string) {
    this.abi = a;
    if (o) this.owner = o;
  }

  /**
   * @remarks
   * When one letter is not available, use a full descriptive word
   *
   * @param address - ETH address of an already deployed smart contract
   * @param o - Optional specified transaction options
   *
   * @returns boolean indicating a successful attachment to an already deployed contract
   */
  protected async at(address: string, o?: TransactOpts) Promise<boolean> {
    this.requireOwner(opts)
    this.address = address
    
    this.contract = await this.provider.contract(address, this.abi) // TODO these args
    return !!this.contract
  }

  /**
   * @remarks
   * Convenience methods which abstracts repetitive checking for the presence of an owner
   * either in a passed TransactOpts or on this instantiated class
   *
   * @param o - Optional passed TransactOpts
   *
   * @returns The owner ETH account address
   */
  requireOwner(o?: TransactOpts) string {
    const owner = o && o.From || this.owner
    if (!owner) throw new ReferenceError(OWNER_REQUIRED)
    return owner
  }
}
