# Overview

The MarketPlace contract wrapper allows a user to fetch market information from the MarketPlace smart contract, mature a market or transfer their vault notional. 

## Market

Market information is returned in a struct of the following shape:

```typescript
interface Market {
    adapter: string;
    cTokenAddr: string;
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



## exchangeRate

Allows a user to retrieve a market's exchange rate.

[More information on compounding tokens and exchange rates](../COMPOUNDING_RATES.md).

### Signature

```typescript
exchangeRate (p: Protocols, a: string, t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the lending protocol associated with the market.|
|a|`string`|The cToken address of the market.|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the exchange rate of the lending protocol's cToken/pool to underlying if the contract call succeeds and rejects otherwise. The scale of the exchange rate depends on the lending protocol and can be retrieved from each protocol's [documentation](../COMPOUNDING_RATES.md).



## interestRate

Allows a user to retrieve a market's interest rate (supply APY).

[More information on compounding tokens and interest rates](../COMPOUNDING_RATES.md).

### Signature

```typescript
interestRate (p: Protocols, a: string): Promise<string | undefined>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the lending protocol associated with the market.|
|a|`string`|The cToken address of the market.|

### Returns

A promise that resolves with the interest rate (supply APY) of the lending protocol's cToken/pool if the contract call succeeds and rejects otherwise. The interest rate is a stringified floating point number, where 1 == 100%, 0.01 == 1%, etc.



## rates

Allows a user to retrieve a market's maturity rate and exchange rate in one call.

### Signature

```typescript
rates (p: Protocols, u: string, m: BigNumberish, t: CallOverrides = {}): Promise<[string, string]>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the market.|
|u|`string`|The underlying token address of the market.|
|m|`BigNumberish`|The maturity timestamp of the market.|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with a tuple containing the maturity rate and exchange rate of the market if the contract call succeeds and rejects otherwise. 

> N.B.: For markets which are not matured, the maturity rate is `0`. In this case you generally want to use the market's exchange rate. For this reason, **if a market is not matured, the tuple returned will contain the exchange rate in both positions**.



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



## cTokenAddress

Allows a user to retrieve a market's cToken address.

### Signature

```typescript
cTokenAddress (p: Protocols, u: string, m: BigNumberish, t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the market.|
|u|`string`|The underlying token address of the market.|
|m|`BigNumberish`|The maturity timestamp of the market.|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the market's cToken address if the contract call succeeds and rejects otherwise.



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
