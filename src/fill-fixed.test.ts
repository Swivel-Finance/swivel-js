import 'mocha'
import { assert } from 'chai'
import Provider from './providers/ethers'
import Swivel from './swivel'

describe('Swivel fillFixed method', () => { 
  let swivel:Swivel

  beforeEach(() => {
    const provider:Provider = new Provider('ethersFooProvider', 'ethersFooSigner') 
    swivel = new Swivel(provider) 
  })

  it('fills fixed yo', () => {
    assert.equal(swivel.fillFixed(), 'TODO')
   })
})
