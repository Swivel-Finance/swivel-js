import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from '../vendors/ethers'
import Swivel from '../swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { Order, TxResponse, Contract } from '../interfaces'
import { cloneWithWriteAccess } from '../helpers'

describe('Swivel batchFillFixed method', () => {
  let swivel: Swivel
  let vendor: Vendor

  before(() => {
    const ethersProvider = getDefaultProvider()
    const signer = Wallet.createRandom().connect(ethersProvider)
    vendor = new Vendor(ethersProvider, signer)
    swivel = new Swivel(vendor, 42, '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccD')
    swivel.at('0xabc')
  })

  it('has a delegated batchFillFixed method', () => {
    assert.equal(typeof swivel.contract?.functions.batchFillFixed, 'function')
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

    const fake = stub(contract.functions, 'batchFillFixed')
    fake.resolves({ hash: '0xhash' })

    const orders: Order[] = [
      {
        key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
        maker: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        underlying: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        floating: false,
        principal: '1000',
        interest: '50',
        duration: '12345',
        expiry: '123456789',
      },
      {
        key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c03',
        maker: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        underlying: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        floating: false,
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
    const components = signatures.map((sig) => vendor.splitSignature(sig))

    const result: TxResponse = await swivel.batchFillFixed(orders, fillings, agreementKey, signatures)
    assert(fake.calledOnce)
    assert.isNotNull(result)
    assert.equal(result.hash, '0xhash')

    const { args } = fake.getCall(0)
    assert.isArray(args[0])
    assert.deepEqual(
      args[0],
      orders.map((o) => vendor.prepareOrder(o)),
    )

    assert.isArray(args[1])
    assert.deepEqual(args[1], validFillings)

    assert.equal(args[2], agreementKey)

    assert.isArray(args[3])
    assert.deepEqual(args[3], components)
  })
})
