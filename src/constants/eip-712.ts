import { TypedDataField } from '@ethersproject/abstract-signer';
import { utils } from 'ethers';

/**
 * Swivel domain for EIP-712 signing.
 */
export const DOMAIN_NAME = 'Swivel Finance';

/**
 * Swivel version for EIP-712 signing.
 */
export const DOMAIN_VERSION = '3.0.0';

/**
 * The typed data description for signing messages according to EIP-712.
 */
export const TYPES: Record<string, TypedDataField[]> = {
    // the `eth_signTypedData` json-rpc call needs the domain type
    EIP712Domain: [
        {
            name: 'name',
            type: 'string',
        },
        {
            name: 'version',
            type: 'string',
        },
        {
            name: 'chainId',
            type: 'uint256',
        },
        {
            name: 'verifyingContract',
            type: 'address',
        },
    ],
    // the order type
    Order: [
        {
            name: 'key',
            type: 'bytes32',
        },
        {
            name: 'protocol',
            type: 'uint8',
        },
        {
            name: 'maker',
            type: 'address',
        },
        {
            name: 'underlying',
            type: 'address',
        },
        {
            name: 'vault',
            type: 'bool',
        },
        {
            name: 'exit',
            type: 'bool',
        },
        {
            name: 'principal',
            type: 'uint256',
        },
        {
            name: 'premium',
            type: 'uint256',
        },
        {
            name: 'maturity',
            type: 'uint256',
        },
        {
            name: 'expiry',
            type: 'uint256',
        },
    ],
};

/**
 * The order struct abi.
 */
export const ORDER_ABI = `Order(${ TYPES['Order'].map(type => `${ type.type } ${ type.name }`).join(',') })`;

/**
 * The order type hash (a keccack hash of the order struct abi).
 */
export const ORDER_TYPEHASH = utils.keccak256(utils.toUtf8Bytes(ORDER_ABI));
