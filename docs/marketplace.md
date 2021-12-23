# Overview

The MarketPlace contract wrapper allows a user to fetch market information from the MarketPlace smart contract, mature a market or transfer their vault notional. 

Market information is returned in a struct of the following shape:

## Market

```typescript
interface Market {
    cTokenAddr: string;
    zcTokenAddr: string;
    vaultAddr: string;
    maturityRate: string;
}
```

## Creating a MarketPlace instance

The snippet below illustrates how you can create a MarketPlace instance and what information you need to do so.

```typescript
import { EthersVendor, MarketPlace } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the address of the deployed MarketPlace contract
const marketPlaceAddress = '0x998689650D4d55822b4bDd4B7DB5F596bf6b3570';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...create a Vendor for the MarketPlace contract,
const vendor = new EthersVendor(provider, signer);

// ...and use the vendor to instantiate the MarketPlace contract
const marketPlace = new MarketPlace(vendor).at(marketPlaceAddress);
```



# Properties

## address

Holds the current contract address used by the MarketPlace instance.

### Signature

```typescript
address?: string;
```



# Getters

## admin

Allows a user to get the admin address of this MarketPlace.

### Signature

```typescript
admin (): Promise<string>;
```

### Returns

A promise that resolves with the admin address if the contract call succeeds and rejects otherwise.



## swivel

Allows a user to get the Swivel contract address associated with this MarketPlace.

### Signature

```typescript
swivel (): Promise<string>;
```

### Returns

A promise that resolves with the Swivel contract's address if the contract call succeeds and rejects otherwise.



## paused

Allows a user to check if this MarketPlace has been paused.

### Signature

```typescript
paused (): Promise<boolean>;
```

### Returns

A promise that resolves with `true` or `false` if the contract call succeeds and rejects otherwise.



# Methods

## constructor

Creates an instance of the MarketPlace smart contract wrapper.

### Signature
```typescript
constructor (v: Vendor): MarketPlace;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|v|`Vendor`|A vendor instance (ethers.js or web3.js vendor) to use.|



## at

Connects a MarketPlace instance to a deployed MarketPlace smart contract on chain.

### Signature

```typescript
at (a: string, o?: TxOptions): MarketPlace;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|a|`string`|The address of the deployed MarketPlace smart contract.|
|o|`TxOptions`|Optional transaction options to override ethers.js' default transaction options.|

### Returns

The connected MarketPlace instance.



## markets

Allows a user to retrieve market information from the MarketPlace.

### Signature

```typescript
markets (u: string, m: uint256): Promise<Market>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|u|`string`|The address of the market's underlying token.|
|m|`uint256`|The market's maturity.|

### Returns

A promise that resolves with a `Market` if the contract call succeeds and rejects otherwise.

### Example

Fetch the market information from one of Swivel's markets from the MarketPlace contract.

A market is identified my its underlying token address and its maturity. You can use the Swivel Exchange API to fetch the available markets (underlying/maturity pairs).

```typescript
// you will need the underlying token address and maturity of a market
const underlying = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const maturity = '1648177200';

// assuming you already created a MarketPlace instance (as shown above)
// use the underlying and maturity to retrieve the market information
const market = await marketPlace.markets(underlying, maturity);

// you now have access to the market's cTokenAddress, zcTokenAdress, 
// vaultAddress and maturityRate, e.g.:
const cTokenAddress = market.cTokenAddress;
const maturityRate = market.maturityRate;
```



## matureMarket

Allows a user to mature a market in the MarketPlace.

### Signature

```typescript
matureMarket (u: string, m: uint256): Promise<TxResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|u|`string`|The address of the market's underlying token.|
|m|`uint256`|The market's maturity.|

### Returns

A promise that resolves with a `TxResonse` if the contract call succeeds and rejects otherwise.



## transferVaultNotional

Allows a user to transfer the their notional from a market in the MarketPlace.

### Signature

```typescript
transferVaultNotional (u: string, m: uint256, t: string, a: uint256): Promise<TxResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|u|`string`|The address of the market's underlying token.|
|m|`uint256`|The market's maturity.|
|t|`string`|The target address to which to transfer the notional.|
|a|`uint256`|The amount of notional to transfer.|

### Returns

A promise that resolves with a `TxResonse` if the contract call succeeds and rejects otherwise.
