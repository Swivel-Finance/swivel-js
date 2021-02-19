import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from './vendors/ethers'
import Swivel from './swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { Order, TxResponse, Contract } from './interfaces'
import { cloneWithWriteAccess } from './helpers'

describe('Swivel batchFillFloating method', () => {
  let swivel: Swivel
  let vendor: Vendor

  before(() => {
    const ethersProvider = getDefaultProvider()
    const signer = Wallet.createRandom().connect(ethersProvider)
    vendor = new Vendor(ethersProvider, signer)
    swivel = new Swivel(vendor)
    swivel.at('0xabc')
  })

  it('has a delegated batchFillFloating method', () => {
    assert.equal(typeof swivel.contract?.functions.batchFillFloating, 'function')
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

    const fake = stub(contract.functions, 'batchFillFloating')
    fake.resolves({ blockNumber: 789 })

    const orders: Order[] = [
      {
        key: 'order1',
        maker: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        underlying: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        floating: true,
        principal: '1000',
        interest: '50',
        duration: '12345',
        expiry: '123456789',
        nonce: '42',
      },
      {
        key: 'order2',
        maker: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        underlying: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        floating: true,
        principal: '3000',
        interest: '60',
        duration: '12343',
        expiry: '123456782',
        nonce: '43',
      },
    ]
    const fillings = ['50', '60']
    const agreementKeys = ['0xagree1', '0xagree2']

    const validFillings = []
    const validAggreementKeys = []
    for (let i = 0; i < fillings.length; i++) {
      const { filling, agreementKey } = vendor.prepareOrderMeta(fillings[i], agreementKeys[i])
      validFillings.push(filling)
      validAggreementKeys.push(agreementKey)
    }

    const result: TxResponse = await swivel.batchFillFloating(orders, fillings, agreementKeys)
    assert(fake.calledOnce)
    assert.isNotNull(result)
    assert.equal(result.blockNumber, 789)

    const { args } = fake.getCall(0)
    assert.isArray(args[0])
    assert.deepEqual(
      args[0],
      orders.map((o) => vendor.prepareOrder(o)),
    )

    assert.isArray(args[1])
    assert.deepEqual(args[1], validFillings)

    assert.isArray(args[2])
    assert.deepEqual(args[2], validAggreementKeys)
  })
})
