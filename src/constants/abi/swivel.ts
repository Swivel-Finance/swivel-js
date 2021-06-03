export const SWIVEL_ABI = [
    {
        'inputs': [
            { 'internalType': 'address', 'name': 'm', 'type': 'address' },
        ],
        'stateMutability': 'nonpayable',
        'type': 'constructor',
    },
    {
        'anonymous': false,
        'inputs': [
            { 'indexed': true, 'internalType': 'bytes32', 'name': 'key', 'type': 'bytes32' },
        ],
        'name': 'Cancel',
        'type': 'event',
    },
    {
        'inputs': [],
        'name': 'DOMAIN',
        'outputs': [
            { 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'NAME',
        'outputs': [
            { 'internalType': 'string', 'name': '', 'type': 'string' },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'VERSION',
        'outputs': [
            { 'internalType': 'string', 'name': '', 'type': 'string' },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'admin',
        'outputs': [
            { 'internalType': 'address', 'name': '', 'type': 'address' },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'components': [
                    { 'internalType': 'bytes32', 'name': 'key', 'type': 'bytes32' },
                    { 'internalType': 'address', 'name': 'maker', 'type': 'address' },
                    { 'internalType': 'address', 'name': 'underlying', 'type': 'address' },
                    { 'internalType': 'bool', 'name': 'vault', 'type': 'bool' },
                    { 'internalType': 'bool', 'name': 'exit', 'type': 'bool' },
                    { 'internalType': 'uint256', 'name': 'principal', 'type': 'uint256' },
                    { 'internalType': 'uint256', 'name': 'premium', 'type': 'uint256' },
                    { 'internalType': 'uint256', 'name': 'maturity', 'type': 'uint256' },
                    { 'internalType': 'uint256', 'name': 'expiry', 'type': 'uint256' },
                ],
                'internalType': 'struct Hash.Order',
                'name': 'o',
                'type': 'tuple',
            },
            {
                'components': [
                    { 'internalType': 'uint8', 'name': 'v', 'type': 'uint8' },
                    { 'internalType': 'bytes32', 'name': 'r', 'type': 'bytes32' },
                    { 'internalType': 'bytes32', 'name': 's', 'type': 'bytes32' },
                ],
                'internalType': 'struct Sig.Components',
                'name': 'c',
                'type': 'tuple',
            },
        ],
        'name': 'cancel',
        'outputs': [
            { 'internalType': 'bool', 'name': '', 'type': 'bool' },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            { 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' },
        ],
        'name': 'cancelled',
        'outputs': [
            { 'internalType': 'bool', 'name': '', 'type': 'bool' },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'components': [
                    { 'internalType': 'bytes32', 'name': 'key', 'type': 'bytes32' },
                    { 'internalType': 'address', 'name': 'maker', 'type': 'address' },
                    { 'internalType': 'address', 'name': 'underlying', 'type': 'address' },
                    { 'internalType': 'bool', 'name': 'vault', 'type': 'bool' },
                    { 'internalType': 'bool', 'name': 'exit', 'type': 'bool' },
                    { 'internalType': 'uint256', 'name': 'principal', 'type': 'uint256' },
                    { 'internalType': 'uint256', 'name': 'premium', 'type': 'uint256' },
                    { 'internalType': 'uint256', 'name': 'maturity', 'type': 'uint256' },
                    { 'internalType': 'uint256', 'name': 'expiry', 'type': 'uint256' },
                ],
                'internalType': 'struct Hash.Order[]',
                'name': 'o',
                'type': 'tuple[]',
            },
            { 'internalType': 'uint256[]', 'name': 'a', 'type': 'uint256[]' },
            {
                'components': [
                    { 'internalType': 'uint8', 'name': 'v', 'type': 'uint8' },
                    { 'internalType': 'bytes32', 'name': 'r', 'type': 'bytes32' },
                    { 'internalType': 'bytes32', 'name': 's', 'type': 'bytes32' },
                ],
                'internalType': 'struct Sig.Components[]',
                'name': 'c',
                'type': 'tuple[]',
            },
        ],
        'name': 'exit',
        'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            { 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' },
        ],
        'name': 'filled',
        'outputs': [
            { 'internalType': 'uint256', 'name': '', 'type': 'uint256' },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'components': [
                    { 'internalType': 'bytes32', 'name': 'key', 'type': 'bytes32' },
                    { 'internalType': 'address', 'name': 'maker', 'type': 'address' },
                    { 'internalType': 'address', 'name': 'underlying', 'type': 'address' },
                    { 'internalType': 'bool', 'name': 'vault', 'type': 'bool' },
                    { 'internalType': 'bool', 'name': 'exit', 'type': 'bool' },
                    { 'internalType': 'uint256', 'name': 'principal', 'type': 'uint256' },
                    { 'internalType': 'uint256', 'name': 'premium', 'type': 'uint256' },
                    { 'internalType': 'uint256', 'name': 'maturity', 'type': 'uint256' },
                    { 'internalType': 'uint256', 'name': 'expiry', 'type': 'uint256' },
                ],
                'internalType': 'struct Hash.Order[]',
                'name': 'o',
                'type': 'tuple[]',
            },
            { 'internalType': 'uint256[]', 'name': 'a', 'type': 'uint256[]' },
            {
                'components': [
                    { 'internalType': 'uint8', 'name': 'v', 'type': 'uint8' },
                    { 'internalType': 'bytes32', 'name': 'r', 'type': 'bytes32' },
                    { 'internalType': 'bytes32', 'name': 's', 'type': 'bytes32' },
                ],
                'internalType': 'struct Sig.Components[]',
                'name': 'c',
                'type': 'tuple[]',
            },
        ],
        'name': 'initiate',
        'outputs': [
            { 'internalType': 'bool', 'name': '', 'type': 'bool' },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'marketPlaceAddr',
        'outputs': [
            { 'internalType': 'address', 'name': '', 'type': 'address' },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
] as const;