import assert from 'assert';
import { BigNumber } from 'ethers';
import { suite, test } from 'mocha';
import { Exception, EXCEPTION, parseSwivelError, SwivelError } from '../../src/index.js';

suite('errors', () => {

    // a subset of an ethers `UNPREDICTABLE_GAS_LIMIT` error
    const UNPREDICTABLE_GAS_LIMIT_ERROR = {
        reason: 'cannot estimate gas; transaction may fail or may require manual gas limit',
        code: 'UNPREDICTABLE_GAS_LIMIT',
        error: {
            reason: 'execution reverted',
            code: 'UNPREDICTABLE_GAS_LIMIT',
            method: 'estimateGas',
            transaction: {},
            error: {
                reason: 'processing response error',
                code: 'SERVER_ERROR',
                body: '{"jsonrpc":"2.0","id":50,"error":{"code":3,"data":"0x6d4c6c89000000000000000000000000000000000000000000000000000000000000000f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a957abb7d32e89d069e9b0623c6244ccf7835ba0000000000000000000000007111f9aeb2c1b9344ec274780dc9e3806bdc60ef","message":"execution reverted"}}',
                error: {
                    code: 3,
                    data: '0x6d4c6c89000000000000000000000000000000000000000000000000000000000000000f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a957abb7d32e89d069e9b0623c6244ccf7835ba0000000000000000000000007111f9aeb2c1b9344ec274780dc9e3806bdc60ef',
                },
                requestBody: '{"method":"eth_estimateGas","params":[{"type":"0x2","maxFeePerGas":"0x59682f10","maxPriorityFeePerGas":"0x59682f00","from":"0x2a957abb7d32e89d069e9b0623c6244ccf7835ba","to":"0x668980c676140f003747a493f82a1888162dc2af","data":"0xc48d8ae9000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000000000000000000000000000000000000000000183215c89c99a9334e383e813edbc6fac6ab858ac66d7c642c8475932eab931f400000000000000000000000000000000000000000000000000000000000000010000000000000000000000007111f9aeb2c1b9344ec274780dc9e3806bdc60ef0000000000000000000000005592ec0cfb4dbc12d3ab100b257153436a1f0fea000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000004563918244f4000000000000000000000000000000000000000000000000000000000000630550cd0000000000000000000000000000000000000000000000000000000062f038ce0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000001c2cda68d61208568f24052d41709f85e0b5c98e1e93c771fc0b510200d15a490432a082d275a9f662ed4a489df1a11f5671767105cac3816120383b7ba3767eab"}],"id":50,"jsonrpc":"2.0"}',
                requestMethod: 'POST',
                url: 'https://rinkeby.infura.io/v3/2935bd3e4bef4fa1a392304441c1bb3e',
            },
        },
    };

    // a subset of an ethers `CALL_EXCEPTION` error
    const CALL_EXCEPTION_ERROR = {
        reason: null,
        code: 'CALL_EXCEPTION',
        method: 'cancel((bytes32,uint8,address,address,bool,bool,uint256,uint256,uint256,uint256)[],(uint8,bytes32,bytes32)[])',
        data: '0x6d4c6c89000000000000000000000000000000000000000000000000000000000000000f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a957abb7d32e89d069e9b0623c6244ccf7835ba0000000000000000000000007111f9aeb2c1b9344ec274780dc9e3806bdc60ef',
        errorArgs: [
            15,
            BigNumber.from(0),
            BigNumber.from(0),
            '0x2A957abb7d32E89d069e9b0623c6244ccf7835BA',
            '0x7111F9Aeb2C1b9344EC274780dc9e3806bdc60Ef',
        ],
        errorName: 'Exception',
        errorSignature: 'Exception(uint8,uint256,uint256,address,address)',
        address: '0x668980C676140F003747A493f82A1888162DC2aF',
        args: [],
        transaction: {},
    };

    suite('parseSwivelError', () => {

        test('parse UNPREDICTABLE_GAS_LIMIT error', () => {

            const error = parseSwivelError(UNPREDICTABLE_GAS_LIMIT_ERROR);

            assert(error instanceof SwivelError);

            assert.strictEqual(error.code, 15);
            assert.strictEqual(error.name, EXCEPTION[15].name);
            assert.strictEqual(error.message, EXCEPTION[15].message(error.data as unknown as Exception));
        });

        test('parse CALL_EXCEPTION error', () => {

            const error = parseSwivelError(CALL_EXCEPTION_ERROR);

            assert(error instanceof SwivelError);

            assert.strictEqual(error.code, 15);
            assert.strictEqual(error.name, EXCEPTION[15].name);
            assert.strictEqual(error.message, EXCEPTION[15].message(error.data as unknown as Exception));
        });
    });
});
