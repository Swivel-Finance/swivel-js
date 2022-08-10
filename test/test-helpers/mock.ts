import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, Contract, ContractFunction, PayableOverrides } from 'ethers';
import { SinonStub, stub } from 'sinon';
import { MarketPlace, Swivel, VaultTracker } from '../../src/contracts/index.js';
import { Result, TransactionExecutor } from '../../src/helpers/index.js';
import { Order, Protocols } from '../../src/types/index.js';

/**
 * The HOCs which are allowed to be stubbed.
 */
export type SwivelContract = Swivel | MarketPlace | VaultTracker;

/**
 * A helper type to access the protected `contract` property on the HOCs.
 */
export type HasContract = {
    contract: Contract;
};

/**
 * A helper type to define the return type of an ethers contract method.
 */
export type TypedContractResult<T = unknown> = T extends TransactionResponse ? T : T extends unknown[] ? Result<T> : Result<[T]>;

/**
 * A helper type to add a return type an ethers `Contract`'s `functions` object.
 */
export type TypedContractFunctions<T = unknown> = {
    [name: string]: ContractFunction<TypedContractResult<T>>;
};

/**
 * Mock a contract method of a higher order contract.
 *
 * @param c - the HOC to mock
 * @param m - the contract method to mock
 * @returns the mocked method as {@link SinonStub}
 */
export const mockMethod = <T = unknown> (c: SwivelContract, m: string): SinonStub<unknown[], Promise<TypedContractResult<T>>> => {

    // clone the protected ethers contract to make it configurable
    const contract = clone((c as unknown as HasContract).contract);

    // stub the desired method on the cloned contract
    const mock = stub(contract.functions as TypedContractFunctions<T>, m);

    // replace the original ethers contract with the stubbed clone
    (c as unknown as HasContract).contract = contract;

    // return the mock method
    return mock;
};

/**
 * Mock a transaction response object.
 *
 * @param response - an optional partial transaction response
 */
export const mockResponse = (response?: Partial<TransactionResponse>): TransactionResponse => ({
    chainId: 1,
    confirmations: 1,
    data: '',
    from: '',
    gasLimit: BigNumber.from('1000'),
    hash: '0xresponse',
    nonce: 1,
    value: BigNumber.from('0'),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    wait: (c?: number) => Promise.resolve({} as TransactionReceipt),
    ...response,
});

/**
 * Mock a valid {@link Order} object.
 *
 * @remarks
 * We need a valid `key` for `utils.arrayify` to work.
 */
export const mockOrder = (order?: Partial<Order>): Order => {

    return {
        key: '0x2ed9afbde849f7586011b0250c68294d9f7eb2b6e87612eb65e253bfc0991a7b',
        protocol: Protocols.Compound,
        maker: '0x2A957abb7d32E89d069e9b0623c6244ccf7835BA',
        underlying: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
        vault: true,
        exit: true,
        expiry: '1645740383',
        maturity: '1669957199',
        premium: '90000000000000000000',
        principal: '100000000000000000000',
        ...order,
    };
};

/**
 * Mock an order signature hash.
 */
export const mockSignature = (): string =>
    '0x0c38dca4a76e5f34883bb8f38a7b90a32b70a718d3a90e9edacc4a80cd47ee685724ab951049bd4bbb062429daea596989f746c0ea9338c78a398691eb6c3a531b';

/**
 * Clone an object to make a frozen or non-configurable object configurable again.
 *
 * @param o - the object to clone
 * @returns a configurable clone of the object
 */
export function clone<T = unknown> (o: T): T {

    if (Array.isArray(o)) {

        return o.map<unknown>(item => clone(item)) as unknown as T;
    }

    if (typeof o === 'object' && o !== null) {

        const result: Record<string, unknown> = {};

        for (const key in o) {

            result[key] = clone(o[key]);
        }

        return result as T;
    }

    return o;
}

export const mockExecutor = (): TransactionExecutor => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (c: Contract, m: string, a: unknown[], t: PayableOverrides = {}, o = false) => {

        // the mocked executor will skip `callStatic` and `estimateGas` during tests and invoke
        // the mocked method immediately

        return await c.functions[m](...a, t) as TransactionResponse;
    };
};
