import 'mocha'
import { assert } from 'chai'
import Provider from './ethers'
import { Contract } from '../interfaces'

describe('Ethers Provider abstraction', () => { 
  let provider:Provider

  beforeEach(() => {
    provider = new Provider('ethersFooProvider', 'ethersFooSigner') 
  })

  it('constructs', () => {
    assert.equal(provider.provider, 'ethersFooProvider')
    assert.equal(provider.signer, 'ethersFooSigner')
   })

  it('returns a low level contract', () => {
    const contract:Contract = provider.contract('0x123', ['foo', 'bar'])
    assert.isNotNull(contract)
    assert.equal(contract.address, '0x123')
  })
})
