import { TypedDataDomain } from '@ethersproject/abstract-signer'

export * from './swivel'

export const DOMAIN: TypedDataDomain = {
  name: 'Swivel Finance',
  version: '1.0.0',
  chainId: 42,
  verifyingContract: '0x1522dD4E44092fA8A4D624770895ba47C77d065E',
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
