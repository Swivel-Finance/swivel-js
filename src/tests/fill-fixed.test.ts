import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from '../vendors/ethers'
import Swivel from '../swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { Order, TxResponse, Contract } from '../interfaces'
import { cloneWithWriteAccess } from '../helpers'

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
    }
    const filling = '50'
    const agreementKey = '0xagree'
    const signature =
      '0x64eac3e9c741fce72cc8abaddb269b3b00046e17e7feff5f5fc4a9b02c720fa427cf7b1fb3a3fdad7af4489c729d995c4c62ef90729d8a096fbe6233b1c3a4af28'

    const validFilling = vendor.prepareFillingAmount(filling)
    const validAgreementKey = vendor.prepareAgreementKey(agreementKey)
    const components = vendor.splitSignature(signature)

    const result: TxResponse = await swivel.fillFixed(order, filling, agreementKey, signature)
    assert(fake.calledOnce)
    assert.isNotNull(result)
    assert.equal(result.blockNumber, 789)

    const { args } = fake.getCall(0)
    assert.deepEqual(args[0], vendor.prepareOrder(order))
    assert.isFalse(args[0].floating)
    assert.deepEqual(args[1], validFilling)
    assert.equal(args[2], validAgreementKey)
    assert.deepEqual(args[3], components)
  })
})
