import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from '../vendors/ethers'
import Swivel from '../swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { Order, TxResponse, Contract } from '../interfaces'
import { cloneWithWriteAccess } from '../helpers'

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
      },
    ]
    const fillings = ['50', '60']
    const agreementKey = '0xagree1'
    const signatures = [
      '0x64eac3e9c741fce72cc8abaddb269b3b00046e17e7feff5f5fc4a9b02c720fa427cf7b1fb3a3fdad7af4489c729d995c4c62ef90729d8a096fbe6233b1c3a4af28',
      '0x64eac3e9c741fce72cc8abaddb269b3b00046e17e7feff5f5fc4a9b02c720fa427cf7b1fb3a3fdad7af4489c729d995c4c62ef90729d8a096fbe6233b1c3a4af28',
    ]

    const validFillings = []
    for (let i = 0; i < fillings.length; i++) {
      const filling = vendor.prepareFillingAmount(fillings[i])
      validFillings.push(filling)
    }
    const validAggreementKey = vendor.prepareAgreementKey(agreementKey)
    const components = signatures.map((sig) => vendor.splitSignature(sig))

    const result: TxResponse = await swivel.batchFillFloating(orders, fillings, agreementKey, signatures)
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

    assert.deepEqual(args[2], validAggreementKey)

    assert.isArray(args[3])
    assert.deepEqual(args[3], components)
  })
})
