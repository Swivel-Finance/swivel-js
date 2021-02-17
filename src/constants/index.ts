import { TypedDataDomain } from '@ethersproject/abstract-signer'

export * from './swivel'

export const DOMAIN: TypedDataDomain = {
  name: 'My Messaging App',
  version: '1',
  chainId: 5,
  verifyingContract: '0x7753cfAD258eFbC52A9A1452e42fFbce9bE486cb',
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
    { name: 'nonce', type: 'uint256' },
  ],
}
