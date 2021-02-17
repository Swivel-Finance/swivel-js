import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from './vendors/ethers'
import Swivel from './swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { Order, TxResponse, Contract } from './interfaces'
import { cloneWithWriteAccess } from './helpers'

describe('Swivel fillFixed method', () => {
  let swivel: Swivel
  let vendor: Vendor

  before(() => {
    const ethersProvider = getDefaultProvider()
    const signer = Wallet.createRandom().connect(ethersProvider)
    vendor = new Vendor(ethersProvider, signer)
    swivel = new Swivel(vendor)
    swivel.at('0xabc')
  })

  it('has a delegated fillFixed method', () => {
    assert.equal(typeof swivel.contract?.functions.fillFixed, 'function')
  })

  it('passes the call thru to the meta contract', async () => {
    // allow stubbing contract properties
    swivel.contract = cloneWithWriteAccess(swivel.contract)

    const invalidContract = {
      address: '0xinvalid',
      functions: {},
    }

    const contract: Contract = swivel.contract ? swivel.contract : invalidContract
    assert.isNotNull(contract)
    assert.notDeepEqual(contract, invalidContract)

    const fake = stub(contract.functions, 'fillFixed')
    fake.resolves({ blockNumber: 789 })

    const order: Order = {
      key: 'order',
      maker: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      underlying: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      floating: false,
      principal: '1000',
      interest: '50',
      duration: '12345',
      expiry: '123456789',
      nonce: '42',
    }
    const filling = '50'
    const agreementKey = '0xagree'

    const meta = vendor.prepareOrderMeta(filling, agreementKey)

    const result: TxResponse = await swivel.fillFixed(order, filling, agreementKey)
    assert(fake.calledOnce)
    assert.isNotNull(result)
    assert.equal(result.blockNumber, 789)

    const { args } = fake.getCall(0)
    assert.deepEqual(args[0], vendor.prepareOrder(order))
    assert.deepEqual(args[1], meta.filling)
    assert.equal(args[2], meta.agreementKey)
  })
})
