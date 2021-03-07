import { TypedDataDomain } from '@ethersproject/abstract-signer'

export * from './swivel'

export const DOMAIN: TypedDataDomain = {
  name: 'Swivel Finance',
  version: '1.0.0',
  chainId: 42,
  verifyingContract: '0x33E17F512a509D592a484BfD34B1B6feD5815658',
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
