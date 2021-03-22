export * from './swivel'

export const DOMAIN_NAME = 'Swivel Finance'
export const DOMAIN_VERSION = '1.0.0'

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
