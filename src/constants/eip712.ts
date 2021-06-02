import { TypedDataDomain } from '../interfaces/eip712';

/**
 * Swivel domain for EIP-712 signing.
 */
export const DOMAIN_NAME = 'Swivel Finance';

/**
 * Swivel version for EIP-712 signing.
 */
export const DOMAIN_VERSION = '2.0.0';

/**
 * The typed data description for signing messages according to EIP-712.
 */
export const TYPES = {
    // the `eth_signTypedData` json-rpc call also needs the domain type
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
 * Get the domain data for EIP-712 signing.
 *
 * @param i - chain-id
 * @param c - verifying contract
 */
export const domain = (i: number, c: string): TypedDataDomain => ({
    name: DOMAIN_NAME,
    version: DOMAIN_VERSION,
    chainId: i,
    verifyingContract: c,
});
