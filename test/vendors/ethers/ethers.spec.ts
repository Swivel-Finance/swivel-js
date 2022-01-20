import { Signer } from '@ethersproject/abstract-signer';
import { getDefaultProvider, Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { assert } from 'chai';
import { BigNumber, ethers, utils } from 'ethers';
import { MARKET_PLACE_ABI, Order, SWIVEL_ABI } from '../../../src/index.js';
import { EthersMarketPlaceContract, EthersSwivelContract, EthersVendor, toBigNumber, prepareOrder, Result, splitSignature, unwrap, fromBigNumber } from '../../../src/vendors/ethers/index.js';

describe('vendors/ethers', () => {

    let provider: Provider;
    let signer: Signer;

    const chainId = 42;
    const verifyingContract = '0xdd644f221Eec4Fbe1B89C74bC7b276A0a2b8818f';

    const order: Order = {
        key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
        maker: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        underlying: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        vault: false,
        exit: false,
        principal: '1000',
        premium: '50',
        maturity: '12345',
        expiry: '123456789',
    };

    before(() => {

        provider = getDefaultProvider();
        signer = Wallet.createRandom().connect(provider);
    });

    it('constructs a vendor', () => {

        const vendor = new EthersVendor(provider, signer);

        assert.instanceOf(vendor, EthersVendor);
        assert.equal(vendor.provider, provider);
        assert.equal(vendor.signer, signer);
    });

    it('creates low-level swivel contract', () => {

        const vendor = new EthersVendor(provider, signer);
        const address = '0x123';
        const contract = vendor.contracts.swivel(address, SWIVEL_ABI);

        assert.instanceOf(contract, EthersSwivelContract);
        assert.equal(contract.address, address);
    });

    it('creates low-level marketplace contract', () => {

        const vendor = new EthersVendor(provider, signer);
        const address = '0x123';
        const contract = vendor.contracts.marketPlace(address, MARKET_PLACE_ABI);

        assert.instanceOf(contract, EthersMarketPlaceContract);
        assert.equal(contract.address, address);
    });

    it('signs orders', async () => {

        const vendor = new EthersVendor(provider, signer);
        const signature = await vendor.signOrder(order, chainId, verifyingContract);

        assert.isTrue(typeof signature === 'string');
        assert.isNotEmpty(signature);
    });

    describe('utils', () => {

        describe('toBigNumber', () => {

            // TODO: Does this test even make sense? It literally re-implements the prepareAmount function.
            it('converts a uint256 to BigNumber', () => {

                const valueString = '37';
                const valueNumber = 37;
                const valueArray = [3, 7];

                let value = toBigNumber(valueString);

                assert.instanceOf(value, BigNumber);
                assert.deepEqual(value, BigNumber.from(valueString));

                value = toBigNumber(valueNumber);

                assert.instanceOf(value, BigNumber);
                assert.deepEqual(value, BigNumber.from(valueNumber));

                value = toBigNumber(valueArray);

                assert.instanceOf(value, BigNumber);
                assert.deepEqual(value, BigNumber.from(valueArray));
            });
        });

        describe('fromBigNumber', () => {

            it('converts a BigNumber to string', () => {

                const valueBigNumber = BigNumber.from('37');

                const value = fromBigNumber(valueBigNumber);

                assert.strictEqual(typeof value, 'string');
                assert.strictEqual(value, '37');
            });
        });

        // TODO: Does this test even make sense? It literally re-implements the prepareOrder function.
        it('prepares an order', () => {

            const preparedOrder = prepareOrder(order);

            assert.isOk(preparedOrder);
            assert.deepEqual(preparedOrder.key, utils.arrayify(order.key));
            assert.equal(preparedOrder.maker, order.maker);
            assert.equal(preparedOrder.underlying, order.underlying);
            assert.equal(preparedOrder.vault, order.vault);
            assert.deepEqual(preparedOrder.principal, ethers.BigNumber.from(order.principal));
            assert.deepEqual(preparedOrder.premium, ethers.BigNumber.from(order.premium));
            assert.deepEqual(preparedOrder.maturity, ethers.BigNumber.from(order.maturity));
            assert.deepEqual(preparedOrder.expiry, ethers.BigNumber.from(order.expiry));
        });

        it('splits a signature', async () => {

            const vendor = new EthersVendor(provider, signer);
            const signature = await vendor.signOrder(order, chainId, verifyingContract);
            const components = splitSignature(signature);

            assert.isOk(signature);

            assert.equal(components.r, `0x${ signature.substr(2, 64) }`);
            assert.equal(components.s, `0x${ signature.substr(66, 64) }`);
            assert.isTrue(components.v >= 27);
        });

        it('unwraps a result', () => {

            let unwrapped: unknown;

            unwrapped = unwrap(['test'] as Result<[string]>);
            assert.strictEqual(unwrapped, 'test');

            unwrapped = unwrap([1000] as Result<[number]>);
            assert.strictEqual(unwrapped, 1000);

            unwrapped = unwrap([true] as Result<[boolean]>);
            assert.strictEqual(unwrapped, true);

            // for named return parameters, the `Result` object includes the named key

            unwrapped = unwrap({ 0: 'test', name: 'test', length: 1 } as unknown as Result<[string]>);
            assert.strictEqual(unwrapped, 'test');

            unwrapped = unwrap({ 0: 1000, name: 1000, length: 1 } as unknown as Result<[number]>);
            assert.strictEqual(unwrapped, 1000);

            unwrapped = unwrap({ 0: true, name: true, length: 1 } as unknown as Result<[boolean]>);
            assert.strictEqual(unwrapped, true);
        });
    });
});
