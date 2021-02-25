import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from '../vendors/ethers'
import Swivel from '../swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { TxResponse, Contract } from '../interfaces'
import { cloneWithWriteAccess } from '../helpers'

describe('Swivel batchRelease method', () => {
  let swivel: Swivel
  let vendor: Vendor

  before(() => {
    const ethersProvider = getDefaultProvider()
    const signer = Wallet.createRandom().connect(ethersProvider)
    vendor = new Vendor(ethersProvider, signer)
    swivel = new Swivel(vendor)
    swivel.at('0xabc')
  })

  it('has a delegated batchRelease method', () => {
    assert.equal(typeof swivel.contract?.functions.batchRelease, 'function')
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

    const fake = stub(contract.functions, 'batchRelease')
    fake.resolves({ blockNumber: 789 })

    const orderKeys = ['order1', 'order1']
    const agreementKeys = ['0xagree1', '0xagree2']

    const validOrderKeys = []
    const validAggreementKeys = []
    for (let i = 0; i < orderKeys.length; i++) {
      const { orderKey, agreementKey } = vendor.prepareReleaseMeta(orderKeys[i], agreementKeys[i])
      validOrderKeys.push(orderKey)
      validAggreementKeys.push(agreementKey)
    }

    const result: TxResponse = await swivel.batchRelease(orderKeys, agreementKeys)
    assert(fake.calledOnce)
    assert.isNotNull(result)
    assert.equal(result.blockNumber, 789)

    const { args } = fake.getCall(0)
    assert.isArray(args[0])
    assert.deepEqual(args[0], validOrderKeys)
    assert.isArray(args[1])
    assert.deepEqual(args[1], validAggreementKeys)
  })
})
