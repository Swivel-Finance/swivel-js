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
   * This method only care about the order and take care of signing the order with specific vendor's signer.
   *
   * @param o - order object without any vendor specific stuff added
   * @param p - raw provider instance
   */
  async signOrder(o: Order, p: any): Promise<string> {
    return await this.vendor.signOrder(o, p)
  }

  /**
   * @remarks
   * This method only care about the order, filling amout & agreement key and take care of signing the order with specific vendor's signer before calling the fillFixed method in the smart contract.
   *
   * @param o - order object without any vendor specific stuff added
   * @param a - filling
   * @param k - agreement key
   * @param s - signature
   */
  async fillFixed(o: Order, a: string, k: string, s: string): Promise<TxResponse> {
    const order = this.vendor.prepareOrder(o)
    const components: Components = this.vendor.splitSignature(s)
    const filling = this.vendor.prepareFillingAmount(a)

    return await this.contract?.functions.fillFixed(order, filling, k, components)
  }

  /**
   * @remarks
   * This method only care about the order, filling amout & agreement key and take care of signing the order with specific vendor's signer before calling the fillFloating method in the smart contract.
   *
   * @param o - order object without any vendor specific stuff added
   * @param a - filling
   * @param k - agreement key
   * @param s - signature
   */
  async fillFloating(o: Order, a: string, k: string, s: string): Promise<TxResponse> {
    const order = this.vendor.prepareOrder(o)
    const components: Components = this.vendor.splitSignature(s)
    const filling = this.vendor.prepareFillingAmount(a)

    return await this.contract?.functions.fillFloating(order, filling, k, components)
  }

  /**
   * @remarks
   * This method only care about the order key, & agreement key and calls the releaseFixed method in the smart contract.
   *
   * @param o - order key
   * @param a - agreement key
   */
  async releaseFixed(o: string, a: string): Promise<TxResponse> {
    return await this.contract?.functions.releaseFixed(o, a)
  }

  /**
   * @remarks
   * This method only care about the order key, & agreement key and calls the releaseFloating method in the smart contract.
   *
   * @param o - order key
   * @param a - agreement key
   */
  async releaseFloating(o: string, a: string): Promise<TxResponse> {
    return await this.contract?.functions.releaseFloating(o, a)
  }

  /**
   * @remarks
   * This method only care about the order array, filling amout array & agreement key array and take care of signing the order with specific vendor's signer before calling the batchFillFixed method in the smart contract.
   *
   * @param o - orders array without any vendor specific stuff added
   * @param a - filling amounts array
   * @param k - agreement key
   * @param s - signature array
   */
  async batchFillFixed(o: Order[], a: string[], k: string, s: string[]): Promise<TxResponse> {
    const orders = o.map((r: Order) => this.vendor.prepareOrder(r))
    const components: Components[] = s.map((sig) => this.vendor.splitSignature(sig))
    const fillings = []
    for (let i = 0; i < a.length; i++) {
      const filling = this.vendor.prepareFillingAmount(a[i])
      fillings.push(filling)
    }

    return await this.contract?.functions.batchFillFixed(orders, fillings, k, components)
  }

  /**
   * @remarks
   * This method only care about the order array, filling amout array & agreement key array and take care of signing the order with specific vendor's signer before calling the batchFillFloating method in the smart contract.
   *
   * @param o - order array without any vendor specific stuff added
   * @param a - filling amount array
   * @param k - agreement key
   * @param s - signature array
   */
  async batchFillFloating(o: Order[], a: string[], k: string, s: string[]): Promise<TxResponse> {
    const orders = o.map((r: Order) => this.vendor.prepareOrder(r))
    const components: Components[] = s.map((sig) => this.vendor.splitSignature(sig))
    const fillings = []
    for (let i = 0; i < a.length; i++) {
      const filling = this.vendor.prepareFillingAmount(a[i])
      fillings.push(filling)
    }

    return await this.contract?.functions.batchFillFloating(orders, fillings, k, components)
  }

  /**
   * @remarks
   * This method only care about the order keys array, & agreement keys array and calls the batchRelease method in the smart contract.
   *
   * @param o - order keys array
   * @param a - agreement keys array
   */
  async batchRelease(o: string[], a: string[]): Promise<TxResponse> {
    return await this.contract?.functions.batchRelease(o, a)
  }

  /**
   * @remarks
   * This method only care about the order and take care of signing the order with specific vendor's signer before calling the cancel method in the smart contract.
   *
   * @param o - order
   * @param s - signature
   */
  async cancel(o: Order, s: string): Promise<TxResponse> {
    const order = this.vendor.prepareOrder(o)
    const components: Components = this.vendor.splitSignature(s)

    return await this.contract?.functions.cancel(order, components)
  }
}
