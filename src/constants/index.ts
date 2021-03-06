import { TypedDataDomain } from '@ethersproject/abstract-signer'

export * from './swivel'

export const DOMAIN: TypedDataDomain = {
  name: 'Swivel Finance',
  version: '1.0.0',
  chainId: 5,
  verifyingContract: '0x73b13224a1C2Ca1f6c9ab8fBc09446230B6D1B5e',
}

export const TYPES = {
  Order: [
    { name: 'key', type: 'string' },
    { name: 'maker', type: 'address' },
    { name: 'underlying', type: 'address' },
    { name: 'floating', type: 'bool' },
    { name: 'principal', type: 'string' },
    { name: 'interest', type: 'string' },
    { name: 'duration', type: 'string' },
    { name: 'expiry', type: 'string' },
  ],
}
