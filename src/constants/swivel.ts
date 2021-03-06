export const SWIVEL_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'i', type: 'uint256' },
      { internalType: 'address', name: 'c', type: 'address' },
      { internalType: 'address', name: 'v', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'bytes32', name: 'key', type: 'bytes32' }],
    name: 'Cancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'orderKey', type: 'bytes32' },
      { indexed: true, internalType: 'bytes32', name: 'agreementKey', type: 'bytes32' },
    ],
    name: 'Initiate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'orderKey', type: 'bytes32' },
      { indexed: true, internalType: 'bytes32', name: 'agreementKey', type: 'bytes32' },
    ],
    name: 'Release',
    type: 'event',
  },
  {
    inputs: [],
    name: 'CTOKEN',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DOMAIN',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'NAME',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: '', type: 'bytes32' },
      { internalType: 'bytes32', name: '', type: 'bytes32' },
    ],
    name: 'agreements',
    outputs: [
      { internalType: 'address', name: 'maker', type: 'address' },
      { internalType: 'address', name: 'taker', type: 'address' },
      { internalType: 'address', name: 'underlying', type: 'address' },
      { internalType: 'bool', name: 'floating', type: 'bool' },
      { internalType: 'bool', name: 'released', type: 'bool' },
      { internalType: 'uint256', name: 'rate', type: 'uint256' },
      { internalType: 'uint256', name: 'principal', type: 'uint256' },
      { internalType: 'uint256', name: 'interest', type: 'uint256' },
      { internalType: 'uint256', name: 'duration', type: 'uint256' },
      { internalType: 'uint256', name: 'release', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32', name: 'key', type: 'bytes32' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'bool', name: 'floating', type: 'bool' },
          { internalType: 'uint256', name: 'principal', type: 'uint256' },
          { internalType: 'uint256', name: 'interest', type: 'uint256' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
        ],
        internalType: 'struct Hash.Order[]',
        name: 'o',
        type: 'tuple[]',
      },
      { internalType: 'uint256[]', name: 'a', type: 'uint256[]' },
      { internalType: 'bytes32', name: 'k', type: 'bytes32' },
      {
        components: [
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' },
        ],
        internalType: 'struct Sig.Components[]',
        name: 'c',
        type: 'tuple[]',
      },
    ],
    name: 'batchFillFixed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32', name: 'key', type: 'bytes32' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'bool', name: 'floating', type: 'bool' },
          { internalType: 'uint256', name: 'principal', type: 'uint256' },
          { internalType: 'uint256', name: 'interest', type: 'uint256' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
        ],
        internalType: 'struct Hash.Order[]',
        name: 'o',
        type: 'tuple[]',
      },
      { internalType: 'uint256[]', name: 'a', type: 'uint256[]' },
      { internalType: 'bytes32', name: 'k', type: 'bytes32' },
      {
        components: [
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' },
        ],
        internalType: 'struct Sig.Components[]',
        name: 'c',
        type: 'tuple[]',
      },
    ],
    name: 'batchFillFloating',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32[]', name: 'o', type: 'bytes32[]' },
      { internalType: 'bytes32[]', name: 'a', type: 'bytes32[]' },
    ],
    name: 'batchRelease',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32', name: 'key', type: 'bytes32' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'bool', name: 'floating', type: 'bool' },
          { internalType: 'uint256', name: 'principal', type: 'uint256' },
          { internalType: 'uint256', name: 'interest', type: 'uint256' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
        ],
        internalType: 'struct Hash.Order',
        name: 'o',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' },
        ],
        internalType: 'struct Sig.Components',
        name: 'c',
        type: 'tuple',
      },
    ],
    name: 'cancel',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'cancelled',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32', name: 'key', type: 'bytes32' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'bool', name: 'floating', type: 'bool' },
          { internalType: 'uint256', name: 'principal', type: 'uint256' },
          { internalType: 'uint256', name: 'interest', type: 'uint256' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
        ],
        internalType: 'struct Hash.Order',
        name: 'o',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'a', type: 'uint256' },
      { internalType: 'bytes32', name: 'k', type: 'bytes32' },
      {
        components: [
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' },
        ],
        internalType: 'struct Sig.Components',
        name: 'c',
        type: 'tuple',
      },
    ],
    name: 'fillFixed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32', name: 'key', type: 'bytes32' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'bool', name: 'floating', type: 'bool' },
          { internalType: 'uint256', name: 'principal', type: 'uint256' },
          { internalType: 'uint256', name: 'interest', type: 'uint256' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
        ],
        internalType: 'struct Hash.Order',
        name: 'o',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'a', type: 'uint256' },
      { internalType: 'bytes32', name: 'k', type: 'bytes32' },
      {
        components: [
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' },
        ],
        internalType: 'struct Sig.Components',
        name: 'c',
        type: 'tuple',
      },
    ],
    name: 'fillFloating',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'filled',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'o', type: 'bytes32' },
      { internalType: 'bytes32', name: 'a', type: 'bytes32' },
    ],
    name: 'releaseFixed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'o', type: 'bytes32' },
      { internalType: 'bytes32', name: 'a', type: 'bytes32' },
    ],
    name: 'releaseFloating',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
