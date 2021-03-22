import 'mocha'
import { assert } from 'chai'
import Vendor from '../vendors/ethers'
import { ValidOrder } from '../vendors/interfaces/order'
import { Components, Contract } from '../interfaces'
import { Provider, getDefaultProvider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { ethers, utils } from 'ethers'

describe('Ethers Provider abstraction', () => {
  let vendor: Vendor

  let signer: Signer
  let provider: Provider
  const order: any = {
    key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
    maker: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    underlying: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    floating: false,
    principal: '1000',
    interest: '50',
    duration: '12345',
    expiry: '123456789',
  }

  before(() => {
    provider = getDefaultProvider()
    signer = Wallet.createRandom().connect(provider)
    vendor = new Vendor(provider, signer)
  })

  it('constructs', () => {
    assert.equal(vendor.provider, provider)
    assert.equal(vendor.signer, signer)
  })

  it('returns a low level contract', () => {
    const abi = ['function balanceOf(address owner) view returns (uint256)']
    const contract: Contract = vendor.contract('0x123', abi)
    assert.isNotNull(contract)
    assert.equal(contract.address, '0x123')
  })

  it('returns a ether specific order', () => {
    const validOrder: ValidOrder = vendor.prepareOrder(order)
    assert.isNotNull(validOrder)
    assert.deepEqual(validOrder.key, utils.arrayify(order.key))
    assert.equal(validOrder.maker, order.maker)
    assert.equal(validOrder.underlying, order.underlying)
    assert.equal(validOrder.floating, order.floating)
    assert.deepEqual(validOrder.principal, ethers.BigNumber.from(order.principal))
    assert.deepEqual(validOrder.interest, ethers.BigNumber.from(order.interest))
    assert.deepEqual(validOrder.duration, ethers.BigNumber.from(order.duration))
    assert.deepEqual(validOrder.expiry, ethers.BigNumber.from(order.expiry))
  })

  it('returns a valid signature', async () => {
    const signature: string = await vendor.signOrder(order, 42,'0xdd644f221Eec4Fbe1B89C74bC7b276A0a2b8818f')
    assert.isNotNull(signature)
  })

  it('returns a splited sig', async () => {
    const signature: string = await vendor.signOrder(order, 42,'0xdd644f221Eec4Fbe1B89C74bC7b276A0a2b8818f')
    const components: Components = vendor.splitSignature(signature)
    assert.isNotNull(components)
    assert.isFalse(components.v < 27)
  })
})
