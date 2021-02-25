import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from '../vendors/ethers'
import Swivel from '../swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { Order, TxResponse, Contract } from '../interfaces'
import { cloneWithWriteAccess } from '../helpers'

describe('Swivel cancel method', () => {
  let swivel: Swivel
  let vendor: Vendor

  before(() => {
    const ethersProvider = getDefaultProvider()
    const signer = Wallet.createRandom().connect(ethersProvider)
    vendor = new Vendor(ethersProvider, signer)
    swivel = new Swivel(vendor)
    swivel.at('0xabc')
  })

  it('has a delegated cancel method', () => {
    assert.equal(typeof swivel.contract?.functions.cancel, 'function')
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

    const fake = stub(contract.functions, 'cancel')
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
    }

    const result: TxResponse = await swivel.cancel(order)
    assert(fake.calledOnce)
    assert.isNotNull(result)
    assert.equal(result.blockNumber, 789)

    const { args } = fake.getCall(0)
    assert.deepEqual(args[0], vendor.prepareOrder(order))
  })
})