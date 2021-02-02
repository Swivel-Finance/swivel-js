import 'mocha'
import { assert } from 'chai'
import { SWIVEL_ABI } from './constants'
import Provider from './providers/ethers'
import Swivel from './swivel'

describe('Swivel contstructor', () => { 
  let swivel:Swivel

  beforeEach(() => {
    const provider:Provider = new Provider('ethersFooProvider', 'ethersFooSigner') 
    swivel = new Swivel(provider) 
  })

  it('constructs', () => {
    assert.equal(swivel.abi, SWIVEL_ABI)
   })
})
