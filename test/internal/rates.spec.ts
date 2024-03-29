import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Wallet, getDefaultProvider } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { getExchangeRate, getInterestRate } from '../../src/internal/index.js';
import { Protocols } from '../../src/types/index.js';
import { NETWORK } from '../test-helpers/index.js';

const createProvider = (chain: number = NETWORK): [Provider, Signer] => {

    const provider = getDefaultProvider(chain);
    const signer = Wallet.createRandom().connect(provider);

    return [provider, signer];
};

/**
 * This suite is not a traditional test-suite:
 *
 * It runs against mainnet and only serves to visually output the retrieved
 * exchange rates and interest rates per protocol and allow us to compare
 * those values with what each protocol provides on their app ui.
 *
 * For this reason, this suite is skipped by default.
 *
 * If you want to check the current rates returned by the implementation,
 * change `suite.skip` to `suite.only` and run the tests with `npm run test`.
 */
suite.skip('rates', () => {

    let provider: Provider;
    let signer: Signer;

    suiteSetup(() => {

        [provider, signer] = createProvider(1);
    });

    suite('compound', () => {

        const protocol = Protocols.Compound;
        const address = '0x39aa39c021dfbae8fac545936693ac917d5e7563'; // cUSDC

        test('exchangeRate', async () => {

            const result = await getExchangeRate(protocol, address, provider);

            console.log(result);

            assert.ok(result);
        });

        test('interestRate', async () => {

            const result = await getInterestRate(protocol, address, provider);

            console.log(result);

            assert.ok(result);
        });
    });

    suite('rari', () => {

        const protocol = Protocols.Rari;
        const address = '0xd8553552f8868C1Ef160eEdf031cF0BCf9686945'; // fFEI

        test('exchangeRate', async () => {

            const result = await getExchangeRate(protocol, address, provider);

            console.log(result);

            assert.ok(result);
        });

        test('interestRate', async () => {

            const result = await getInterestRate(protocol, address, provider);

            console.log(result);

            assert.ok(result);
        });
    });

    suite('yearn', () => {

        const protocol = Protocols.Yearn;
        const address = '0xe2F6b9773BF3A015E2aA70741Bde1498bdB9425b'; // Yearn USDC Vault (yvUSDC)

        test('exchangeRate', async () => {

            const result = await getExchangeRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });

        test('interestRate', async () => {

            const result = await getInterestRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });
    });

    suite.skip('euler', () => {

        const protocol = Protocols.Euler;
        const address = '0xEb91861f8A4e1C12333F42DCE8fB0Ecdc28dA716'; // Euler EToken for USDC market

        test('exchangeRate', async () => {

            const result = await getExchangeRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });

        test('interestRate', async () => {

            const result = await getInterestRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });
    });

    suite('aave', () => {

        const protocol = Protocols.Aave;
        const address = '0xBcca60bB61934080951369a648Fb03DF4F96263C'; // Aave AToken for USDC market

        test('exchangeRate', async () => {

            const result = await getExchangeRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });

        test('interestRate', async () => {

            const result = await getInterestRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });
    });

    suite('lido', () => {

        const protocol = Protocols.Lido;
        const address = '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0'; // wstETH address

        test('exchangeRate', async () => {

            const result = await getExchangeRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });

        test('interestRate', async () => {

            const result = await getInterestRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });
    });

    suite('frax / erc-4626', () => {

        const protocol = Protocols.Frax;
        const address = '0xac3E018457B222d93114458476f3E3416Abbe38F'; // sfrxETH address

        test('exchangeRate', async () => {

            const result = await getExchangeRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });

        test('interestRate', async () => {

            const result = await getInterestRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });
    });

    suite.skip('lido - goerli', () => {

        const [, signer] = createProvider(5);
        const protocol = Protocols.Lido;
        const address = '0x6320cd32aa674d2898a68ec82e869385fc5f7e2f'; // wstETH address

        test('exchangeRate', async () => {

            const result = await getExchangeRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });

        test('interestRate', async () => {

            const result = await getInterestRate(protocol, address, signer);

            console.log(result);

            assert.ok(result);
        });
    });
});
