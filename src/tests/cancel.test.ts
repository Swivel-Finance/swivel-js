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
    fake.resolves({ hash: '0xhash' })

    const order: Order = {
      key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
      maker: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      underlying: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      floating: false,
      principal: '1000',
      interest: '50',
      duration: '12345',
      expiry: '123456789',
    }
    const signature =
      '0x64eac3e9c741fce72cc8abaddb269b3b00046e17e7feff5f5fc4a9b02c720fa427cf7b1fb3a3fdad7af4489c729d995c4c62ef90729d8a096fbe6233b1c3a4af28'

    const components = vendor.splitSignature(signature)

    const result: TxResponse = await swivel.cancel(order, signature)
    assert(fake.calledOnce)
    assert.isNotNull(result)
    assert.equal(result.hash, '0xhash')

    const { args } = fake.getCall(0)
    assert.deepEqual(args[0], vendor.prepareOrder(order))
    assert.deepEqual(args[1], components)
  })
})
