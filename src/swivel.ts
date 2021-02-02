import { SWIVEL_ABI } from './constants'
import Deployed from './abstracts/deployed'
import Vendor from './abstracts/vendor'

export default class extends Deployed {
  /**
   * @param v - Instance of a Vendor class
   */
  constructor(v: Vendor) {
    super(v, SWIVEL_ABI)
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
