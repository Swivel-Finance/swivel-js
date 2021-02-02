/**
 * @remarks
 * Base class of all Higher Order Contracts (HOCs).
 * Note that we do not want to couple this class to any specific Provider.
 */

import { OWNER_REQUIRED } from '../errors'
import { Keyed, Contract } from '../interfaces'
import Provider from './provider'

export default abstract class implements Keyed {
  [key:string]: any
  public abi: any
  public provider: Provider
  public contract?: Contract

  /**
   * @param p - Optional Provider the HOC will use
   * @param a - Compiled abi of the smart contract this HOC wraps
   */
  constructor(p: Provider, a: any) {
    this.provider = p
    this.abi = a
  }

  /**
   * @param a - ETH address of an already deployed smart contract
   * @param o - Optional specified transaction options
   *
   * @returns boolean indicating a successful wrapping of the target deployed contract
   */
  protected at(a: string): boolean {
    this.contract = this.provider.contract(a, this.abi)
    return !!this.contract
  }
}
