# Overview

The VaultTracker contract wrapper allows a user to fetch vault information for a particular market and owner.

Vault information is returned in a struct of the following shape:

## Vault

```typescript
interface Vault {
    notional: string;
    redeemable: string;
    exchangeRate: string;
}
```

## Creating a VaultTracker instance

The snippet below illustrates how you can create a VaultTracker instance and what information you need to do so.

```typescript
import { EthersVendor, VaultTracker } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...create a Vendor for the VaultTracker contract,
const vendor = new EthersVendor(provider, signer);

// to create a VaultTracker instance you'll need the address of its
// deployed contract - each market has it's own VaultTracker contract
// you can retrieve the address of a VaultTracker by calling the 
// `markets` method of the MarketPlace wrapper

// you will need the underlying token address and maturity of a market
// you can get them from the Swivel Exchange API
const underlying = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const maturity = '1648177200';

// assuming you already created a MarketPlace instance, 
// retrieve the desired market information...
const market = await marketPlace.markets(underlying, maturity);
// ...and extract the `vaultAddress` of the market
const vaultAddress = market.vaultAddr;

// use the `vendor` and `vaultAdrress` to instantiate the VaultTracker
const vaultTracker = new VaultTracker(vendor).at(vaultAddress);
```



# Properties

## address

Holds the current contract address used by the VaultTracker instance.

### Signature

```typescript
address?: string;
```



# Getters

## admin

Allows a user to get the admin address of this VaultTracker. This is the address of the MarketPlace smart contract that owns this VaultTracker.

### Signature

```typescript
admin (): Promise<string>;
```

### Returns

A promise that resolves with the admin address if the contract call succeeds and rejects otherwise.



## swivel

Allows a user to get the Swivel contract address associated with this VaultTracker.

### Signature

```typescript
swivel (): Promise<string>;
```

### Returns

A promise that resolves with the Swivel contract's address if the contract call succeeds and rejects otherwise.



## maturity

Allows a user to retrieve the vault's maturity. This is a Unix timestamp in seconds.

### Signature

```typescript
maturity (): Promise<string>;
```

### Returns

A promise that resolves with the vault's maturity if the contract call succeeds and rejects otherwise.



## maturityRate

Allows a user to retrieve the vault's maturity rate. This is the cToken's exchange rate at the time of maturity.

### Signature

```typescript
maturityRate (): Promise<string>;
```

### Returns

A promise that resolves with the vault's maturity rate if the contract call succeeds and rejects otherwise.



## cTokenAddr

Allows a user to retrieve the vault's cToken address.

### Signature

```typescript
cTokenAddr (): Promise<string>;
```

### Returns

A promise that resolves with the vault's cToken address if the contract call succeeds and rejects otherwise.



# Methods

## constructor

Creates an instance of the VaultTracker smart contract wrapper.

### Signature
```typescript
constructor (v: Vendor): VaultTracker;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|v|`Vendor`|A vendor instance (ethers.js or web3.js vendor) to use.|



## at

Connects a VaultTracker instance to a deployed VaultTracker smart contract on chain.

### Signature

```typescript
at (a: string, o?: TxOptions): VaultTracker;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|a|`string`|The address of the deployed VaultTracker smart contract.|
|o|`TxOptions`|Optional transaction options to override ethers.js' default transaction options.|

### Returns

The connected VaultTracker instance.



## vaults

Allows a user to retrieve vault information for a specific owner from the VaultTracker.

### Signature

```typescript
vaults (o: string): Promise<Vault>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`string`|The address of the vault's owner.|

### Returns

A promise that resolves with a `Vault` if the contract call succeeds and rejects otherwise.



## balancesOf

Allows a user to retrieve the notional and redeemable balances for a specific owner.

### Signature

```typescript
balancesOf (o: string): Promise<[string, string]>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`string`|The address of the vault's owner.|

### Returns

A promise that resolves with a tuple containing the notional and redeemable balance if the contract call succeeds and rejects otherwise.
