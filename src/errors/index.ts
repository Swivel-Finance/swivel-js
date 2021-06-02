export const CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED = 'chain-id and verifying contract required';

export const CONTRACT_INSTANTIATION_FAILED = (contract: 'marketplace' | 'swivel', address: string): string =>
    `Failed to instantiate deployed ${ contract } contract at ${ address }.`;

export const MISSING_CONTRACT_ADDRESS = (contract: 'marketplace' | 'swivel'): string =>
    `Missing contract address for deployed ${ contract } contract. Set an address using ${ contract }.at(<contract_address>).`;
