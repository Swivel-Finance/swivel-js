import 'mocha'
import { assert } from 'chai'
import Provider from './ethers'
import { Contract } from '../interfaces'
import { Provider as EthersProvider, getDefaultProvider } from "@ethersproject/providers"
import { Signer } from "@ethersproject/abstract-signer"
import { Wallet } from "@ethersproject/wallet"

describe('Ethers Provider abstraction', () => {
  let provider:Provider

  let signer: Signer
  let ethersProvider: EthersProvider

  beforeEach(() => {
    ethersProvider = getDefaultProvider();
    signer = Wallet.createRandom().connect(ethersProvider);
    provider = new Provider(ethersProvider, signer)
  })

  it('constructs', () => {
    assert.equal(provider.provider, ethersProvider)
    assert.equal(provider.signer, signer)
   })

  it('returns a low level contract', () => {
    const abi = [
      "function balanceOf(address owner) view returns (uint256)",
    ];
    const contract:Contract = provider.contract('0x123', abi)
    assert.isNotNull(contract)
    assert.equal(contract.address, '0x123')
  })
})
