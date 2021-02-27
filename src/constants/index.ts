import { TypedDataDomain } from '@ethersproject/abstract-signer'

export * from './swivel'

export const DOMAIN: TypedDataDomain = {
  name: 'My Messaging App',
  version: '1',
  chainId: 42,
  verifyingContract: '0x7753cfAD258eFbC52A9A1452e42fFbce9bE486cb',
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
