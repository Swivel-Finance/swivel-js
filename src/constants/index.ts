import { TypedDataDomain } from '@ethersproject/abstract-signer'

export * from './swivel'

export const DOMAIN: TypedDataDomain = {
  name: 'Swivel Finance',
  version: '1.0.0',
  chainId: 5,
  verifyingContract: '0x6a6BeC42A5Dd6F2766F806F91Ad12034F43b6361',
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
