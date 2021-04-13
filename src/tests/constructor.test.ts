import 'mocha'
import { assert } from 'chai'
import { SWIVEL_ABI } from '../constants'
import Vendor from '../vendors/ethers'
import Swivel from '../swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'

describe('Swivel constructor', () => {
  let vendor: Vendor

  before(() => {
    const ethersProvider = getDefaultProvider()
    const signer = Wallet.createRandom().connect(ethersProvider)
    vendor = new Vendor(ethersProvider, signer)
  })

  it('constructs', () => {
    const swivel: Swivel = new Swivel(vendor)
    assert.equal(swivel.abi, SWIVEL_ABI)
    assert.isUndefined(swivel.chainId)
    assert.isUndefined(swivel.verifyingContract)
  })

  it('valid optional args in constructor', () => {
    const swivel: Swivel = new Swivel(vendor, 42, '0x00')
    assert.equal(swivel.abi, SWIVEL_ABI)
    assert.equal(swivel.chainId, 42)
    assert.equal(swivel.verifyingContract, '0x00')
  })
})
