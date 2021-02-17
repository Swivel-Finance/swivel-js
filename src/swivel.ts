import { SWIVEL_ABI } from './constants'
import Deployed from './abstracts/deployed'
import Vendor from './abstracts/vendor'
import { Order, Components, TxResponse } from './interfaces'

export default class extends Deployed {
  /**
   * @param v - Instance of a Vendor class
   */
  constructor(v: Vendor) {
    super(v, SWIVEL_ABI)
  }
  /**
   * @remarks
   * This method only care about the order, filling amout & agreement key and take care of signing the order with specific vendor's signer
   *
   * @param o - order object without any vendor specific stuff added
   * @param a - filling
   * @param a - agreement key
   */
  async fillFixed(o: Order, a: string, k: string): Promise<TxResponse> {
    const order = this.vendor.prepareOrder(o)
    const signature: string = await this.vendor.signOrder(order)
    const components: Components = this.vendor.splitSign(signature)
    const { filling, agreementKey } = this.vendor.prepareOrderMeta(a, k)

    return await this.contract?.functions.fillFixed(order, filling, agreementKey, components)
  }
}
