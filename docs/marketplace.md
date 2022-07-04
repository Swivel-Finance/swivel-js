# Overview

The MarketPlace contract wrapper allows a user to fetch market information from the MarketPlace smart contract, mature a market or transfer their vault notional. 

## Market

Market information is returned in a struct of the following shape:

```typescript
interface Market {
    cTokenAddr: string;
    adapterAddr: string;
    zcToken: string;
    vaultTracker: string;
    maturityRate: string;
}
```

## Creating a MarketPlace instance

The snippet below illustrates how you can create a MarketPlace instance and what information you need to do so.

```typescript
import { MarketPlace } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the address of the deployed MarketPlace contract
const marketPlaceAddress = '0x998689650D4d55822b4bDd4B7DB5F596bf6b3570';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...and use the signer to instantiate the MarketPlace contract
const marketPlace = new MarketPlace(marketPlaceAddress, signer);
```

## Transaction Overrides

Each contract invocation accepts an optional transaction overrides object as the last argument. For additional information on transaction overrides, please refer to the [ethers documentation](https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend).



# Properties

## address

Holds the current contract address used by the MarketPlace instance.

### Signature

```typescript
address: string;
```



# Getters

## admin

Allows a user to get the admin address of this MarketPlace.

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

Allows a user to get the Swivel contract address associated with this MarketPlace.

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



## paused

Allows a user to check if this MarketPlace has been paused.

### Signature

```typescript
paused (t: CallOverrides = {}): Promise<boolean>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with `true` or `false` if the contract call succeeds and rejects otherwise.



# Methods

## constructor

Creates an instance of the MarketPlace smart contract wrapper.

### Signature
```typescript
constructor (a: string, s: Provider | Signer): MarketPlace;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|a|`string`|The address of the deployed MarketPlace contract.|
|s|`Provider \| Signer`|An ethers provider or signer (a signer is needed for write methods).|

### Example

```typescript
import { MarketPlace } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the address of the deployed MarketPlace contract
const marketPlaceAddress = '0x998689650D4d55822b4bDd4B7DB5F596bf6b3570';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...and use the signer to instantiate the MarketPlace contract
const marketPlace = new MarketPlace(marketPlaceAddress, signer);
```



## markets

Allows a user to retrieve market information from the MarketPlace.

### Signature

```typescript
markets (p: Protocols, u: string, m: BigNumberish, t: CallOverrides = {}): Promise<Market>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the market.|
|u|`string`|The underlying token address of the market.|
|m|`BigNumberish`|The maturity timestamp of the market.|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with a `Market` if the contract call succeeds and rejects otherwise.

### Example

Fetch the market information from one of Swivel's markets from the MarketPlace contract.

A market is identified my its underlying token address and its maturity. You can use the Swivel Exchange API to fetch the available markets (underlying/maturity pairs).

```typescript
import { MarketPlace, Protocols } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you will need the protocol, underlying token address and maturity of a market
const protocol = Protocols.Compound;
const underlying = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const maturity = '1648177200';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...and use the signer to instantiate the MarketPlace contract
const marketPlace = new MarketPlace('0x998689650D4d55822b4bDd4B7DB5F596bf6b3570', signer);

// use the protocol, underlying and maturity to retrieve the market information
const market = await marketPlace.markets(protocol, underlying, maturity);

// you now have access to the market's information, e.g.:
const cTokenAddress = market.cTokenAddress;
const maturityRate = market.maturityRate;
```



## matureMarket

Allows a user to mature a market in the MarketPlace.

### Signature

```typescript
matureMarket (p: Protocols, u: string, m: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the market.|
|u|`string`|The underlying token address of the market.|
|m|`BigNumberish`|The maturity timestamp of the market.|
|t|`PayableOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with an ethers `TransactionResonse` if the contract call succeeds and rejects otherwise.



## transferVaultNotional

Allows a user to transfer the their notional from a market in the MarketPlace.

### Signature

```typescript
transferVaultNotional (p: Protocols, u: string, m: BigNumberish, r: string, a: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the market.|
|u|`string`|The underlying token address of the market.|
|m|`BigNumberish`|The maturity timestamp of the market.|
|r|`string`|The receiver address to which to transfer the notional.|
|a|`BigNumberish`|The amount of notional to transfer.|
|t|`PayableOverrides`|Optional transaction overrides.|


### Returns

A promise that resolves with an ethers `TransactionResonse` if the contract call succeeds and rejects otherwise.
