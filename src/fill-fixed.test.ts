import 'mocha'
import { assert } from 'chai'
import Provider from './providers/ethers'
import Swivel from './swivel'
import { getDefaultProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";

describe('Swivel fillFixed method', () => {
  let swivel:Swivel

  beforeEach(() => {
    const ethersProvider = getDefaultProvider();
    const signer = Wallet.createRandom().connect(ethersProvider);
    const provider:Provider = new Provider(ethersProvider, signer)
    swivel = new Swivel(provider)
  })

  it('fills fixed yo', () => {
    assert.equal(swivel.fillFixed(), 'TODO')
   })
})
