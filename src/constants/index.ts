export * from './swivel'

export const DOMAIN_NAME = 'Swivel Finance'
export const DOMAIN_VERSION = '2.0.0'

export const TYPES = {
  Order: [
    { name: 'key', type: 'bytes32' },
    { name: 'maker', type: 'address' },
    { name: 'underlying', type: 'address' },
    { name: 'vault', type: 'bool' },
    { name: 'exit', type: 'bool' },
    { name: 'principal', type: 'uint256' },
    { name: 'premium', type: 'uint256' },
    { name: 'maturity', type: 'uint256' },
    { name: 'expiry', type: 'uint256' },
  ],
}
