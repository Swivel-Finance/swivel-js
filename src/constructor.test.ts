import 'mocha'
import { assert } from 'chai'
import { SWIVEL_ABI } from './constants'
import Vendor from './vendors/ethers'
import Swivel from './swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'

describe('Swivel constructor', () => {
    let swivel: Swivel

    before(() => {
        const ethersProvider = getDefaultProvider()
        const signer = Wallet.createRandom().connect(ethersProvider)
        const vendor: Vendor = new Vendor(ethersProvider, signer)
        swivel = new Swivel(vendor)
    })

    it('constructs', () => {
        assert.equal(swivel.abi, SWIVEL_ABI)
    })
})
