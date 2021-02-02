import { SWIVEL_ABI } from './constants'
import Deployed from './abstracts/deployed'
import Provider from './abstracts/provider'

export default class extends Deployed {
  /**
   * @param p - Instance of a Provider class
   */
  constructor(p: Provider) {
    super(p, SWIVEL_ABI)
  }
  /**
   * @remarks
   * Once properly setup this call becomes a simple wrapper around the .contract object that
   * was set via `this.at`. Something like `return await this.contract.fillFixed(...` 
   * TODO
   */
  fillFixed(): string {
    return 'TODO'
  }
}
