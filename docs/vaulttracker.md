# Overview

The VaultTracker contract wrapper allows a user to fetch vault information for a particular market and owner.

## Vault

Vault information is returned in a struct of the following shape:

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
import { MarketPlace, Protocols, VaultTracker } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// create an ethers provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// to create a VaultTracker instance you'll need the address of its
// deployed contract - each market has it's own VaultTracker contract
// you can retrieve the address of a VaultTracker by calling the 
// `markets` method of the MarketPlace contract

// you will need the underlying token address, maturity and protocol of a market
// you can get them from the Swivel Exchange API
const underlying = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const maturity = '1648177200';
const protocol = Protocols.Compound;

// instantiate a MarketPlace
const marketPlace = new MarketPlace('0x998689650D4d55822b4bDd4B7DB5F596bf6b3570', signer);

// retrieve the desired market information...
const market = await marketPlace.markets(protocol, underlying, maturity);
// ...and extract the `vaultTracker` of the market
const vaultAddress = market.vaultTracker;

// use the `signer` and `vaultAdrress` to instantiate the VaultTracker
const vaultTracker = new VaultTracker(vaultAddress, signer);
```

## Transaction Overrides

Each contract invocation accepts an optional transaction overrides object as the last argument. For additional information on transaction overrides, please refer to the [ethers documentation](https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend).



# Properties

## address

Holds the current contract address used by the VaultTracker instance.

### Signature

```typescript
address: string;
```



# Getters

## admin

Allows a user to get the admin address of this VaultTracker. This is the address of the MarketPlace smart contract that owns this VaultTracker.

### Signature

```typescript
admin (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the admin address if the contract call succeeds and rejects otherwise.



## swivel

Allows a user to get the Swivel contract address associated with this VaultTracker.

### Signature

```typescript
swivel (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the Swivel contract's address if the contract call succeeds and rejects otherwise.



## maturity

Allows a user to retrieve the vault's maturity. This is a Unix timestamp in seconds.

### Signature

```typescript
maturity (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the vault's maturity if the contract call succeeds and rejects otherwise.



## maturityRate

Allows a user to retrieve the vault's maturity rate. This is the cToken's exchange rate at the time of maturity.

### Signature

```typescript
maturityRate (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the vault's maturity rate if the contract call succeeds and rejects otherwise.



## cTokenAddr

Allows a user to retrieve the vault's cToken address.

### Signature

```typescript
cTokenAddr (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the vault's cToken address if the contract call succeeds and rejects otherwise.



## adapterAddr

Allows a user to retrieve the vault's compounding adapter address.

### Signature

```typescript
adapterAddr (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the vault's compounding adapter address if the contract call succeeds and rejects otherwise.



# Methods

## constructor

Creates an instance of the VaultTracker smart contract wrapper.

### Signature

```typescript
constructor (a: string, p: Provider | Signer): VaultTracker;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|a|`string`|The address of the deployed VaultTracker contract.|
|s|`Provider \| Signer`|An ethers provider or signer.|

### Example

```typescript
import { VaultTracker } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the address of the deployed VaultTracker contract
// You can get the address of a vault from the MarketPlace contract
const vaultAddress = '0x998689650D4d55822b4bDd4B7DB5F596bf6b3570';

// create an ethers provider...
const provider = new ethers.providers.Web3Provider(window.ethereum);

// ...and use the provider to instantiate the VaultTracker contract
const vaultTracker = new VaultTracker(vaultAddress, provider);
```



## vaults

Allows a user to retrieve vault information for a specific owner from the VaultTracker.

### Signature

```typescript
vaults (o: string, t: CallOverrides = {}): Promise<Vault>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`string`|The address of the vault's owner.|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with a `Vault` if the contract call succeeds and rejects otherwise.



## balancesOf

Allows a user to retrieve the notional and redeemable balances for a specific owner.

### Signature

```typescript
balancesOf (o: string, t: CallOverrides = {}): Promise<[string, string]>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`string`|The address of the vault's owner.|
|t|`CallOverrides`|Optional transaction overri

### Returns

A promise that resolves with a tuple containing the notional and redeemable balance if the contract call succeeds and rejects otherwise.
