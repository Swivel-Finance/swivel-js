import { getDefaultProvider, Provider } from '@ethersproject/providers';
import { assert } from 'chai';
import { Signer, Wallet } from 'ethers';
import { VaultTracker } from '../src';
import { MISSING_CONTRACT_ADDRESS } from '../src/errors';
import { EthersVaultTrackerContract, EthersVendor } from '../src/vendors/ethers';
import { TEST_HELPERS } from './test-helpers';

const assertThrows = async (vaultTracker: VaultTracker, method: keyof VaultTracker, ...args: unknown[]) => {

    let error: string | undefined;
    let response: unknown;

    try {

        response = await (vaultTracker[method] as (...args: unknown[]) => Promise<unknown>)(...args);

    } catch (e) {

        error = e as string;
    }

    assert.notOk(response);
    assert.strictEqual(error, MISSING_CONTRACT_ADDRESS('vault-tracker'));
};

describe('VaultTracker', () => {

    let provider: Provider;
    let signer: Signer;

    const deployedAddress = '0x123456789';

    before(() => {

        provider = getDefaultProvider();
        signer = Wallet.createRandom().connect(provider);
    });

    it('constructs', () => {

        const vendor = new EthersVendor(provider, signer);
        const vaultTracker = new VaultTracker(vendor);

        assert.instanceOf(vaultTracker, VaultTracker);

        assert.strictEqual(vaultTracker.vendor, vendor);
    });

    describe('at', () => {

        it('wraps the deployed contract', () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            assert.isUndefined(vaultTracker.address);

            vaultTracker.at(deployedAddress);

            assert.strictEqual(vaultTracker.address, deployedAddress);

            // the vendor specific contract wrapper is a proteced property of the vault tracker client
            // to access it during tests, we employ a test helper
            const contract = TEST_HELPERS.vaultTracker.ethers.getWrappedContract(vaultTracker);

            assert.instanceOf(contract, EthersVaultTrackerContract);
            assert.strictEqual(contract.address, deployedAddress);
        });

        it('has a fluent interface (returns itself)', () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            assert.strictEqual(vaultTracker.at(deployedAddress), vaultTracker);
        });
    });

    describe('admin', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            await assertThrows(vaultTracker, 'admin');
        });
    });

    describe('maturity', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            await assertThrows(vaultTracker, 'maturity');
        });
    });

    describe('matured', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            await assertThrows(vaultTracker, 'matured');
        });
    });

    describe('maturityRate', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            await assertThrows(vaultTracker, 'maturityRate');
        });
    });

    describe('cTokenAddr', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            await assertThrows(vaultTracker, 'cTokenAddr');
        });
    });

    describe('vaults', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            await assertThrows(vaultTracker, 'vaults');
        });
    });

    describe('balancesOf', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            await assertThrows(vaultTracker, 'balancesOf');
        });
    });

    describe('matureVault', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const vaultTracker = new VaultTracker(vendor);

            await assertThrows(vaultTracker, 'matureVault');
        });
    });
});
