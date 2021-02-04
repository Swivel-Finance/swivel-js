import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from './vendors/ethers'
import Swivel from './swivel'
import { getDefaultProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { Order, Components, TxResponse } from './interfaces'

describe('Swivel fillFixed method', () => {
  let swivel: Swivel

  before(() => {
    const ethersProvider = getDefaultProvider();
    const signer = Wallet.createRandom().connect(ethersProvider);
    const vendor: Vendor = new Vendor(ethersProvider, signer)
    swivel = new Swivel(vendor)
    swivel.at('0xabc')
  })


  it('has a delegated fillFixed method', () => {
    assert.equal(typeof swivel.contract?.functions.fillFixed, 'function')
  })

  it('passes the call thru to the meta contract', async () => {
    const response:TxResponse = { blockNumber: 789 }

    const fake = stub(swivel.contract?.functions, 'fillFixed') // sinon.stub has an issue with these arguments. why? TODO
    fake.resolves(response)

    const order:Order = {
      key: '0xorder',
      maker: '0xabc',
      underlying: '0x123',
      floating: false,
      principal: '1000',
      interest: '50',
      duration: '12345',
      expiry: '123456789',
      nonce: '42'
    }

    const components:Components = {
      v: 123,
      r: 'aBc123',
      s: 'DeF456'
    }

    const result:TxResponse = await swivel.fillFixed(order, '50', '0xagree', components)
    assert.isNotNull(result)
    assert.equal(result.blockNumber, 789)

    // TODO all we care about here is that the call to swivel.fillFixed passes the correct args to its
    // `.contract.functions.fillFixed`. getting the stubs correct on this is proving a challenge.
    // with those in place we should be able to inspect the stub.call and see Order, .., .., Components etc...
  })
})
