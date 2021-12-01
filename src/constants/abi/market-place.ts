import { Abi } from '../../interfaces';

export const MARKET_PLACE_ABI = [
    {
        'inputs': [],
        'stateMutability': 'nonpayable',
        'type': 'constructor',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'cToken',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'zcToken',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'vaultTracker',
                'type': 'address',
            },
        ],
        'name': 'Create',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'zcTarget',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'nTarget',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'CustodialExit',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'zcTarget',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'nTarget',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'CustodialInitiate',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'maturityRate',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'matured',
                'type': 'uint256',
            },
        ],
        'name': 'Mature',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'from',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'to',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'P2pVaultExchange',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'from',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'to',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'P2pZcTokenExchange',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'sender',
                'type': 'address',
            },
        ],
        'name': 'RedeemVaultInterest',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'sender',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'RedeemZcToken',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'from',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'to',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'TransferVaultNotional',
        'type': 'event',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
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
        'name': 'burnZcTokenRemovingNotional',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
        ],
        'name': 'cTokenAddress',
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
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'c',
                'type': 'address',
            },
            {
                'internalType': 'string',
                'name': 'n',
                'type': 'string',
            },
            {
                'internalType': 'string',
                'name': 's',
                'type': 'string',
            },
        ],
        'name': 'createMarket',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'z',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'n',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
        ],
        'name': 'custodialExit',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'z',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'n',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
        ],
        'name': 'custodialInitiate',
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
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'name': 'markets',
        'outputs': [
            {
                'internalType': 'address',
                'name': 'cTokenAddr',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'zcTokenAddr',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'vaultAddr',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'maturityRate',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
        ],
        'name': 'matureMarket',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
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
        'name': 'mintZcTokenAddingNotional',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
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
        'name': 'p2pVaultExchange',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
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
        'name': 'p2pZcTokenExchange',
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
                'internalType': 'bool',
                'name': 'b',
                'type': 'bool',
            },
        ],
        'name': 'pause',
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
        'name': 'paused',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 't',
                'type': 'address',
            },
        ],
        'name': 'redeemVaultInterest',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
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
        'name': 'redeemZcToken',
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
                'name': 's',
                'type': 'address',
            },
        ],
        'name': 'setSwivelAddress',
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
                'name': 'a',
                'type': 'address',
            },
        ],
        'name': 'transferAdmin',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
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
        'name': 'transferVaultNotional',
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
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
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
        'name': 'transferVaultNotionalFee',
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
] as Abi;
