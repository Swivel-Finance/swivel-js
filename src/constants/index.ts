import { TypedDataDomain } from '@ethersproject/abstract-signer'

export * from './swivel'

export const DOMAIN: TypedDataDomain = {
  name: 'Swivel Finance',
  version: '1.0.0',
  chainId: 42,
  verifyingContract: '0x350E97B9b8DacA97AA4eb1864B3Ff0643CEFB0f2',
}

export const TYPES = {
  Order: [
    { name: 'key', type: 'bytes32' },
    { name: 'maker', type: 'address' },
    { name: 'underlying', type: 'address' },
    { name: 'floating', type: 'bool' },
    { name: 'principal', type: 'uint256' },
    { name: 'interest', type: 'uint256' },
    { name: 'duration', type: 'uint256' },
    { name: 'expiry', type: 'uint256' },
  ],
}
