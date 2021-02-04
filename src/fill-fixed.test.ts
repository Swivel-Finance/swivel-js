import 'mocha'
import { stub } from 'sinon'
import { assert } from 'chai'
import Vendor from './vendors/ethers'
import Swivel from './swivel'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { Order, Components, TxResponse, Contract } from './interfaces'
import { cloneWithWriteAccess } from './helpers'

describe('Swivel fillFixed method', () => {
    let swivel: Swivel

    before(() => {
        const ethersProvider = getDefaultProvider()
        const signer = Wallet.createRandom().connect(ethersProvider)
        const vendor: Vendor = new Vendor(ethersProvider, signer)
        swivel = new Swivel(vendor)
        swivel.at('0xabc')
    })

    it('has a delegated fillFixed method', () => {
        assert.equal(typeof swivel.contract?.functions.fillFixed, 'function')
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

        const fake = stub(contract.functions, 'fillFixed')
        fake.resolves({ blockNumber: 789 })

        const order: Order = {
            key: '0xorder',
            maker: '0xabc',
            underlying: '0x123',
            floating: false,
            principal: '1000',
            interest: '50',
            duration: '12345',
            expiry: '123456789',
            nonce: '42',
        }

        const components: Components = {
            v: 123,
            r: 'aBc123',
            s: 'DeF456',
        }

        const result: TxResponse = await swivel.fillFixed(order, '50', '0xagree', components)
        assert(fake.calledOnce)
        assert.isNotNull(result)
        assert.equal(result.blockNumber, 789)

        const { args } = fake.getCall(0)
        assert.equal(args[0], order)
        assert.equal(args[1], '50')
        assert.equal(args[2], '0xagree')
        assert.equal(args[3], components)
    })
})
