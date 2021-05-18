import { SWIVEL_ABI } from './constants'
import { CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED } from './errors'
import Deployed from './abstracts/deployed'
import Vendor from './abstracts/vendor'
import { Order, Components, TxResponse } from './interfaces'

export default class extends Deployed {
  public chainId: any
  public verifyingContract: any

  /**
   * @param vendor - Instance of a Vendor class
   * @param i - optional chainId for the deployed smart contract. NOTE: signOrder requires this be set
   * @param verifier - optional address of a deployed verifying contract. NOTE: signOrder requires this be set
   */
  constructor(vendor: Vendor, i?: number, verifier?: string) {
    super(vendor, SWIVEL_ABI)
    this.chainId = i
    this.verifyingContract = verifier
  }

  /**
   * @remarks
   * Proxy method which delegates to its vendor's signOrder method.
   *
   * @param o - raw order object
   * @return Vendor specific Promise
   */
  async signOrder(o: Order): Promise<string> {
    if (!this.chainId || !this.verifyingContract) return Promise.reject(CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED)
    return await this.vendor.signOrder(o, this.chainId, this.verifyingContract)
  }

  /**
   * @remarks
   * Calls to its vendor to prepare the order, gets the signature components then attempts to cancel
   * via the swivel contract method
   *
   * @param o - order
   * @param s - signature
   * @return Promise resolving to a transaction response
   */
  async cancel(o: Order, s: string): Promise<TxResponse> {
    const order = this.vendor.prepareOrder(o)
    const components: Components = this.vendor.splitSignature(s)

    return await this.contract?.functions.cancel(order, components)
  }
}
