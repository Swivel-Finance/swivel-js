import { TypedDataDomain } from '@ethersproject/abstract-signer'

export * from './swivel'

export const DOMAIN: TypedDataDomain = {
  name: 'Swivel Finance',
  version: '1.0.0',
  chainId: 5,
  verifyingContract: '0x416D738C564C2062F22Af6232406899C6bc72AAe',
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
