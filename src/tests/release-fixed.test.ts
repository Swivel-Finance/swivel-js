import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from '../vendors/ethers'
import Swivel from '../swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { TxResponse, Contract } from '../interfaces'
import { cloneWithWriteAccess } from '../helpers'

describe('Swivel releaseFixed method', () => {
  let swivel: Swivel
  let vendor: Vendor

  before(() => {
    const ethersProvider = getDefaultProvider()
    const signer = Wallet.createRandom().connect(ethersProvider)
    vendor = new Vendor(ethersProvider, signer)
    swivel = new Swivel(vendor)
    swivel.at('0xabc')
  })

  it('has a delegated releaseFixed method', () => {
    assert.equal(typeof swivel.contract?.functions.releaseFixed, 'function')
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

    const fake = stub(contract.functions, 'releaseFixed')
    fake.resolves({ blockNumber: 789 })

    const orderKey = 'order'
    const agreementKey = '0xagree'

    const meta = vendor.prepareReleaseMeta(orderKey, agreementKey)

    const result: TxResponse = await swivel.releaseFixed(orderKey, agreementKey)
    assert(fake.calledOnce)
    assert.isNotNull(result)
    assert.equal(result.blockNumber, 789)

    const { args } = fake.getCall(0)
    assert.equal(args[0], meta.orderKey)
    assert.equal(args[1], meta.agreementKey)
  })
})
