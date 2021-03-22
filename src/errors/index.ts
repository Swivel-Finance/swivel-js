/**
 * @remarks
 * It could be argued that errors be placed in ../constants.
 * This may be true, however, it is undetermined if we would decide to
 * instantiate actual instances of errors, or write custom error constructors,
 * therefore, we will keep them in their own dir.
 */

export * from './vendor'

export const OWNER_REQUIRED = 'owner required'
export const PROVIDER_REQUIRED = 'provider required'
export const CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED = 'chain id and verifying contract required'
