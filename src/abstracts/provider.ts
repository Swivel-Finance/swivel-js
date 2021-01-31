/**
 * @remarks
 * Base class of all Providers for Swivel HOCs. This abstraction should only
 * contain the Methods and properties needed by Swivel HOCs to function.
 * Note that 
 */


import { Keyed } from '../interfaces'

export default abstract class implements Keyed {
  [key:string]: any
  provider: any // TODO
  signer: any // TODO

  /**
   * @remarks
   * Method which instantiates and returns the provider specific contract abstraction. Must be
   * implemented in a child class
   *
   */
  abstract protected async contract(): void
}
