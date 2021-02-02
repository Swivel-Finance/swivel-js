import 'mocha'
import { assert } from 'chai'
import Vendor from './vendors/ethers'
import Swivel from './swivel'
import { getDefaultProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";

describe('Swivel fillFixed method', () => {
  let swivel: Swivel

  before(() => {
    const ethersProvider = getDefaultProvider();
    const signer = Wallet.createRandom().connect(ethersProvider);
    const vendor: Vendor = new Vendor(ethersProvider, signer)
    swivel = new Swivel(vendor)
  })

  it('fills fixed yo', () => {
    assert.equal(swivel.fillFixed(), 'TODO')
   })
})
