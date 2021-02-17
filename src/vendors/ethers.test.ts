import 'mocha'
import { assert } from 'chai'
import Vendor from './ethers'
import { Components, Contract, Order } from '../interfaces'
import { Provider, getDefaultProvider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { ValidOrder } from './interfaces/order'
import { ethers, utils } from 'ethers'

describe('Ethers Provider abstraction', () => {
  let vendor: Vendor

  let signer: Signer
  let provider: Provider

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
    const validOrder: ValidOrder = vendor.prepareOrder(order)
    assert.isNotNull(validOrder)
    assert.equal(validOrder.key, utils.formatBytes32String(order.key))
    assert.equal(validOrder.maker, order.maker)
    assert.equal(validOrder.underlying, order.underlying)
    assert.equal(validOrder.floating, order.floating)
    assert.deepEqual(validOrder.principal, ethers.BigNumber.from(order.principal))
    assert.deepEqual(validOrder.interest, ethers.BigNumber.from(order.interest))
    assert.deepEqual(validOrder.duration, ethers.BigNumber.from(order.duration))
    assert.deepEqual(validOrder.expiry, ethers.BigNumber.from(order.expiry))
    assert.deepEqual(validOrder.nonce, ethers.BigNumber.from(order.nonce))
  })

  it('returns a valid signature', async () => {
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
    const validOrder: ValidOrder = vendor.prepareOrder(order)
    const signature: string = await vendor.signOrder(validOrder)
    assert.isNotNull(signature)
  })

  it('returns a splited sig', async () => {
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
    const validOrder: ValidOrder = vendor.prepareOrder(order)
    const signature: string = await vendor.signOrder(validOrder)
    const components: Components = vendor.splitSign(signature)
    assert.isNotNull(components)
    assert.isFalse(components.v < 27)
  })
})
