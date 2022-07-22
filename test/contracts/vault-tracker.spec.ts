import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, CallOverrides, getDefaultProvider } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { VaultResponse, VaultTracker } from '../../src/contracts/index.js';
import { Vault } from '../../src/types/index.js';
import { ADDRESSES, assertGetter, mockMethod } from '../test-helpers/index.js';

suite('vaulttracker', () => {

    const callOverrides: CallOverrides = {
        gasLimit: '1000',
        from: '0xfrom',
        nonce: 1,
    };

    let provider: Provider;

    suiteSetup(() => {

        provider = getDefaultProvider();
    });

    test('create instance', () => {

        const vaulttracker = new VaultTracker(ADDRESSES.VAULT_TRACKER, provider);

        assert(vaulttracker instanceof VaultTracker);

        assert.strictEqual(vaulttracker.address, ADDRESSES.VAULT_TRACKER);
    });

    suite('admin', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new VaultTracker(ADDRESSES.VAULT_TRACKER, provider),
                'admin',
                '0xadmin',
                callOverrides,
            );
        });
    });

    suite('swivel', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new VaultTracker(ADDRESSES.VAULT_TRACKER, provider),
                'swivel',
                '0xswivel',
                callOverrides,
            );
        });
    });

    suite('cTokenAddr', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new VaultTracker(ADDRESSES.VAULT_TRACKER, provider),
                'cTokenAddr',
                '0xcToken',
                callOverrides,
            );
        });
    });

    suite('maturity', () => {

        // an expected maturity string
        const expected = '1656526007';

        test('unwraps and converts result', async () => {

            const vaulttracker = new VaultTracker(ADDRESSES.VAULT_TRACKER, provider);

            // maturity returns a uint256, so ethers will return a BigNumber
            // we create a mock result with a BigNumber and assert the HOC converts it to string
            const maturity = mockMethod<BigNumber>(vaulttracker, 'maturity');
            maturity.resolves([BigNumber.from(expected)]);

            const result = await vaulttracker.maturity();

            assert.strictEqual(result, expected);

            const args = maturity.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const vaulttracker = new VaultTracker(ADDRESSES.VAULT_TRACKER, provider);

            // maturity returns a uint256, so ethers will return a BigNumber
            // we create a mock result with a BigNumber and assert the HOC converts it to string
            const maturity = mockMethod<BigNumber>(vaulttracker, 'maturity');
            maturity.resolves([BigNumber.from(expected)]);

            const result = await vaulttracker.maturity(callOverrides);

            assert.strictEqual(result, expected);

            const args = maturity.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('maturityRate', () => {

        // an expected maturityRate string
        const expected = '1656526007';

        test('unwraps and converts result', async () => {

            const vaulttracker = new VaultTracker(ADDRESSES.VAULT_TRACKER, provider);

            // maturityRate returns a uint256, so ethers will return a BigNumber
            // we create a mock result with a BigNumber and assert the HOC converts it to string
            const maturityRate = mockMethod<BigNumber>(vaulttracker, 'maturityRate');
            maturityRate.resolves([BigNumber.from(expected)]);

            const result = await vaulttracker.maturityRate();

            assert.strictEqual(result, expected);

            const args = maturityRate.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const vaulttracker = new VaultTracker(ADDRESSES.VAULT_TRACKER, provider);

            // maturityRate returns a uint256, so ethers will return a BigNumber
            // we create a mock result with a BigNumber and assert the HOC converts it to string
            const maturityRate = mockMethod<BigNumber>(vaulttracker, 'maturityRate');
            maturityRate.resolves([BigNumber.from(expected)]);

            const result = await vaulttracker.maturityRate(callOverrides);

            assert.strictEqual(result, expected);

            const args = maturityRate.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('vaults', () => {

        const owner = '0xowner';

        // a mocked vault response
        const mockResult = {
            notional: BigNumber.from(0),
            redeemable: BigNumber.from(0),
            exchangeRate: BigNumber.from(1),
        } as VaultResponse;

        // an expected vault result
        const expected: Vault = {
            notional: '0',
            redeemable: '0',
            exchangeRate: '1',
        };

        test('unwraps and converts result', async () => {

            const vaulttracker = new VaultTracker(ADDRESSES.VAULT_TRACKER, provider);

            // vaults returns a struct, so ethers will return a struct
            // we create a mock result with a VaultResponse and assert the HOC converts it to Vault
            const vaults = mockMethod<VaultResponse>(vaulttracker, 'vaults');
            vaults.resolves(mockResult);

            const result = await vaulttracker.vaults(owner);

            assert.deepStrictEqual(result, expected);

            const args = vaults.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedOwnder, passedOverrides] = args;

            assert.strictEqual(passedOwnder, owner);
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const vaulttracker = new VaultTracker(ADDRESSES.VAULT_TRACKER, provider);

            // vaults returns a struct, so ethers will return a struct
            // we create a mock result with a VaultResponse and assert the HOC converts it to Vault
            const vaults = mockMethod<VaultResponse>(vaulttracker, 'vaults');
            vaults.resolves(mockResult);

            const result = await vaulttracker.vaults(owner, callOverrides);

            assert.deepStrictEqual(result, expected);

            const args = vaults.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedOwner, passedOverrides] = args;

            assert.strictEqual(passedOwner, owner);
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('balancesOf', () => {

        const owner = '0xowner';

        // a mocked balance result
        const mockResult = [BigNumber.from(1000000), BigNumber.from(0)] as const;

        // an expected balance result
        const expected = ['1000000', '0'];

        test('unwraps and converts result', async () => {

            const vaulttracker = new VaultTracker(ADDRESSES.VAULT_TRACKER, provider);

            // balancesOf returns a tuple, so ethers will return a tuple
            // we create a mock result with a BigNumber tuple and assert the HOC converts it to a string tuple
            const balancesOf = mockMethod<[BigNumber, BigNumber]>(vaulttracker, 'balancesOf');
            balancesOf.resolves(mockResult);

            const result = await vaulttracker.balancesOf(owner);

            assert.deepStrictEqual(result, expected);

            const args = balancesOf.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedOwnder, passedOverrides] = args;

            assert.strictEqual(passedOwnder, owner);
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const vaulttracker = new VaultTracker(ADDRESSES.VAULT_TRACKER, provider);

            // balancesOf returns a tuple, so ethers will return a tuple
            // we create a mock result with a BigNumber tuple and assert the HOC converts it to a string tuple
            const balancesOf = mockMethod<[BigNumber, BigNumber]>(vaulttracker, 'balancesOf');
            balancesOf.resolves(mockResult);

            const result = await vaulttracker.balancesOf(owner, callOverrides);

            assert.deepStrictEqual(result, expected);

            const args = balancesOf.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedOwnder, passedOverrides] = args;

            assert.strictEqual(passedOwnder, owner);
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });
});
