import { Abi } from '../../interfaces';

export const VAULT_TRACKER_ABI = [
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'c',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 's',
                'type': 'address',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'constructor',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'o',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
        ],
        'name': 'addNotional',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'admin',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'o',
                'type': 'address',
            },
        ],
        'name': 'balancesOf',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'cTokenAddr',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': 'c',
                'type': 'uint256',
            },
        ],
        'name': 'matureVault',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'maturity',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'maturityRate',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'o',
                'type': 'address',
            },
        ],
        'name': 'redeemInterest',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'o',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
        ],
        'name': 'removeNotional',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'swivel',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'f',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
        ],
        'name': 'transferNotionalFee',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'f',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 't',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
        ],
        'name': 'transferNotionalFrom',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'name': 'vaults',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'notional',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'redeemable',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'exchangeRate',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
] as Abi;
