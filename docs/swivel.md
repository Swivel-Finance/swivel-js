# Overview

The Swivel contract allows a user to sign orders; initiate, exit, and cancel orders; as well as split, combine, and redeem their tokens and generated interest.

## Order

Swivel works with an orderbook, as such you'll be interacting with orders frequently to initiate or exit positions.

An order is a struct of the following shape:

```typescript
interface Order {
    key: string;
    protocol: Protocols;
    maker: string;
    underlying: string;
    vault: boolean;
    exit: boolean;
    principal: string;
    premium: string;
    maturity: string;
    expiry: string;
}
```

## Protocol

Swivel supports multiple yield-generating protocols, like Compound, Aave, or Rari to name a few. To identify a market on Swivel, the market's underlying token address, its maturity date as well as the yield-generating protocol are needed.

A protocol is a member of the `Protocols` enum:

```typescript
const enum Protocols {
    Erc4626,
    Compound,
    Rari,
    Yearn,
    Aave,
    Euler,
}
```

## Creating a Swivel instance

The snippet below illustrates how you can create a Swivel instance and what information you need to do so.

```typescript
import { Swivel } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the address of the deployed swivel contract on the connected network (chain)
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...and use the signer to instantiate the Swivel contract
const swivel = new Swivel(swivelAddress, signer);
```



## Transaction Overrides

Each contract invocation accepts an optional transaction overrides object as the last argument. For additional information on transaction overrides, please refer to the [ethers documentation](https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend).



# Properties

## address

Holds the current contract address used by the Swivel instance.

### Signature

```typescript
address: string;
```



# Getters

## NAME

Allows a user to get the Swivel domain name for EIP-712 signing.

### Signature

```typescript
NAME (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the domain name if the contract call succeeds and rejects otherwise.



## VERSION

Allows a user to get the Swivel domain version for EIP-712 signing.

### Signature

```typescript
VERSION (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the domain version if the contract call succeeds and rejects otherwise.



## domain

Allows a user to get the Swivel domain hash for EIP-712 signing.

### Signature

```typescript
domain (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the domain hash if the contract call succeeds and rejects otherwise.



## HOLD

Allows a user to get the the hold time between a scheduled withdrawal and the actual withdrawal.

### Signature

```typescript
HOLD (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the hold time if the contract call succeeds and rejects otherwise.



## MIN_FEENOMINATOR

Allows a user to get the minimum fee denominator for trade fees.

### Signature

```typescript
MIN_FEENOMINATOR (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the minimum fee denominator if the contract call succeeds and rejects otherwise.



## feenominators

Allows a user to get the fee denominators for [`zcTokenInitiate`, `zcTokenExit`, `vaultInitiate`, `vaultExit`] trade fees.

Fee denominators are used to calculate trade fees for each of the above-mentioned trade types, e.g. for a `zcTokenInitiate` (filling a nToken buy order) the fees would be calculated like this:

```solidity
// zcTokenInitiate is the first fee denominator in the tuple
uint16 feenominator = feenominators[0];
// the fee is the order amount devided by the fee denominator
uint256 fee = amount / feenominator;
```

### Signature

```typescript
feenominators (t: CallOverrides = {}): Promise<[number, number, number, number]>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with a tuple of fee denominators if the contract call succeeds and rejects otherwise. The fee denominators tuple has the following order: `zcTokenInitiate`, `zcTokenExit`, `vaultInitiate`, `vaultExit`.



## admin

Allows a user to get Swivel's admin address.

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



## marketPlace

Allows a user to get the associated MarketPlace contract address.

### Signature

```typescript
marketPlace (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the MarketPlace contract's address if the contract call succeeds and rejects otherwise.



## aaveAddr

Allows a user to get the Swivel's Aave contract address.

### Signature

```typescript
aaveAddr (t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the Aave contract address if the contract call succeeds and rejects otherwise.



# Methods

## constructor

Creates an instance of the Swivel smart contract wrapper.

### Signature
```typescript
constructor (a: string, s: Signer): Swivel;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|a|`string`|The address of the deployed Swivel contract.|
|s|`Signer`|An ethers signer (a signer is needed for write methods and signing orders).|

### Example

```typescript
import { Swivel } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the address of the deployed swivel contract on the connected network
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...and use the signer to instantiate the Swivel contract
const swivel = new Swivel(swivelAddress, signer);
```



## signOrder

Allows a user to sign an offline order using EIP-712.

The Swivel smart contract wrapper provides 2 ways to sign an order:
- as a static method of the `Swivel` class
- as a method of a `Swivel` instance

When using the **static method**, the user must provide a signer to sign the order, the address of a deployed Swivel smart contract and the chain id of the network where the contract is deployed. This can be useful when orders should be signed for multiple different Swivel deployments (keep in mind though, that each order needs to specify an underlying, maturity and protocol which is actually available on the targeted Swivel deployment).

When using the **instance method**, the instance's signer and address will be used and the chain id will be inferred from the signer's connected network.

### Signature

```typescript
static signOrder (o: Order, s: Signer, a: string, c: number): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order`|An order object to sign.|
|s|`Signer`|An ethers signer to sign the order with.|
|a|`string`|The address of the deployed swivel contract that will execute the order.|
|c|`number`|The chain id of the network where the swivel contract is deployed.|

### Signature

```typescript
signOrder (o: Order): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order`|An order object to sign.|

### Returns

A promise that resolves with the 132 byte ECDSA signature of the order.

### Example

```typescript
import { Swivel } from '@swivel-finance/swivel-js';
import { ethers, utils } from 'ethers';

// you need the address of the deployed swivel contract on that network
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...and use the signer to instantiate the Swivel contract
const swivel = new Swivel(swivelAddress, signer);

// the order maker is your account address
const maker = await signer.getAddress();
// the order key should be a hash of your account address and a timestamp
const key = utils.keccak256(utils.toUtf8Bytes(`${ maker }${ Date.now() }`));
// you will also need the underlying token address, maturity and protocol of a market
// you can get them from the Swivel Exchange API
const underlying = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const maturity = '1648177200';
const protocol = Protocols.Compound;

// create an order
const order: Order = {
    key: key,
    maker: maker,
    underlying: underlying,
    maturity: maturity,
    protocol: protocol,
    vault: false,
    exit: false,
    principal: '1000',
    premium: '50',
    expiry: '1658177200',
};

// you can now sign the order
const signature = await swivel.signOrder(order);
```



## hashOrder

Allows a user to create an unsigned order hash.

Order hashes are used to retrieve the state of orders from the Swivel contract, e.g. to check if an order is cancelled or to check the fill amount of an order, you will need its hash.

The Swivel smart contract wrapper provides 2 ways to hash an order:
- as a static method of the `Swivel` class
- as a method of a `Swivel` instance

In both cases (static or instance method) the method signature is identical.

### Signature

```typescript
static hashOrder (o: Order): string;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order`|An order object to hash.|

### Signature

```typescript
hashOrder (o: Order): string;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order`|An order object to hash.|

### Returns

The order hash.

### Example

```typescript
import { Swivel } from '@swivel-finance/swivel-js';
import { ethers, utils } from 'ethers';

// you need the address of the deployed swivel contract on that network
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...and use the signer to instantiate the Swivel contract
const swivel = new Swivel(swivelAddress, signer);

// assuming you have an order (which you created or retrieved from the Swivel API)
const order = {
    key: '0xae9c745c42c9e0a03c5ce889a0baa302b8bc59bd02a365c69abf0f003f3a6338',
    maker: '0xsomeMakerAddress',
    protocol: 1,
    underlying: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
    maturity: '1660948392',
    exit: false,
    vault: false,
    premium: '5000000000000000000',
    principal: '100000000000000000000',
    expiry: '1659565992',
};

// you can retrieve the order's hash as follows
const hash = swivel.hashOrder(order);

// you can use the hash to check the state of the order
const cancelled = await swivel.cancelled(hash);
const filled = await swivel.filled(hash);
```



## cancelled

Allows a user to check if an order was cancelled.

### Signature

```typescript
cancelled (h: BytesLike, t: CallOverrides = {}): Promise<boolean>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|h|`BytesLike`|The hash of the order to check.|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with `true` or `false` if the contract call succeeds and rejects otherwise.



## filled

Allows a user to retrieve an order's filled volume.

### Signature

```typescript
filled (h: BytesLike, t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|h|`BytesLike`|The hash of the order to check.|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the orders filled volume if the contract call succeeds and rejects otherwise.



## withdrawals

Allows a user to retrieve a token's withdrawal hold.

When a token withdrawal is scheduled, a timestamp is generated using the current time plus the `HOLD` time and stored in the `withdrawals` map using the token address as key. This map lets a user access these scheduled withdrawal "holds" per token address.

### Signature

```typescript
withdrawals (a: string, t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|a|`string`|The token address to check.|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the token's hold timestamp if the contract call succeeds and rejects otherwise. A hold timestamp of `'0'` indicates that no withdrawal is scheduled.



## approvals

Allows a user to retrieve a token's approval hold.

When a token approval is scheduled, a timestamp is generated using the current time plus the `HOLD` time and stored in the `approvals` map using the token address and the approved contract address as keys. This map lets a user access these scheduled approval "holds" per token and contract address.

### Signature

```typescript
approvals (e: string, a: string, t: CallOverrides = {}): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|e|`string`|The (ERC20) token address to check.|
|a|`string`|The approved contract address to check.|
|t|`CallOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with the token's hold timestamp if the contract call succeeds and rejects otherwise. A hold timestamp of `'0'` indicates that no approval is scheduled.



## initiate

Allows a user to fill part or all of any number of orders by initiating a fixed-yield (zcToken) or amplified-yield (nToken) position.

Signatures can be supplied as an array of `string` (signature hashes), `Signature` (objects with R, S, V components) or `number[]` (byte arrays).

### Signature

```typescript
initiate (o: Order[], a: BigNumberish[], s: SignatureLike[], t: PayableOverrides = {}): Promise<TransactionResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order[]`|An array of order objects to be filled.|
|a|`BigNumberish[]`|An array of order volumes/amounts relative to the passed orders.|
|s|`SignatureLike[]`|An array of valid 132 byte ECDSA signatures relative to the passed orders.|
|t|`PayableOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with an ethers `TransactionResponse` if the contract call succeeds and rejects otherwise.

### Example

```typescript
import { Swivel } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need a subset of the ERC-20 ABI for token allowance and approval
const ERC_20_ABI = [
    'function allowance(address owner, address spender) public view returns (uint256)',
    'function approve(address spender, uint256 value) public returns (bool)',
];

/**
 * Fill an order.
 * 
 * @param amount - the amount of volume to fill
 */
export async function marketOrderFixed (amount: number): Promise<void> {

    // convert the amount to a BigNumber with the appropriate amount of decimals (e.g. 18 for DAI)
    const fillAmount = ethers.utils.parseUnits(amount.toString(), 18);

    // create an ethers provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // constants for Swivel on rinkeby (this might be outdated)
    const swivelAddress = '0xDe9a819630094dF6dA6FF7CCc77E04Fd3ad0ACFE';
    const underlyingAddress = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa';

    // create the Swivel contract
    const swivel = new Swivel(swivelAddress, signer);

    // to fill an order with Swivel, we need to approve Swivel to transfer our tokens
    // in order to do this, we need to:
    //   1. create an ERC20 contract instance
    //   2. check if the Swivel contract has sufficient allowance for the fill amount
    //   3. approve the Swivel contract for at least the fill amount

    // create the ERC-20 token contract for the underlying (e.g. DAI)
    const token = new ethers.Contract(underlyingAddress, ERC_20_ABI, provider);

    // check approval
    const approvalAmount = await token.allowance(window.ethereum.selectedAddress, swivelAddress) as ethers.BigNumber;

    // if not approved approve max uint
    // (this frees you from having to approve each single fill)
    if (approvalAmount.lt(fillAmount)) {

        const approve = await token.approve(swivelAddress, ethers.constants.MaxUint256) as ethers.providers.TransactionResponse;
        await approve.wait();
    }

    // hardcoded nToken purchase order (the order being filled) + signature valid on rinkeby
    // in a real-world scenario you would fetch orders from the Preview Market Order API call
    const order = {
        key: '0x3449db081da0329d51b6757809ce4c1042ea0c110b8980628e46cb4d4b8297fb',
        maker: '0x3f60008Dfd0EfC03F476D9B489D6C5B13B3eBF2C',
        underlying: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
        vault: true,
        exit: false,
        principal: '40000000000000000000000',
        premium: '2000000000000000000000',
        maturity: '1662089767',
        expiry: '1633324220',
    };
    const signature = '0x2ab021d3577a940b6d2b2f47288dc240fb003c24d0af93751bd3b9354e1df0d03e6d2c47a7bf566d6ec887b6884edb80c80f0890d247a363eb31b1e99d5636ae1c';

    // fill the hardcoded order by initiating your position
    // each parameter is an array, as multiple orders can be filled at once
    const tx = await swivel.initiate([order], [fillAmount.toString()], [signature]) as ethers.providers.TransactionResponse;
    
    // wait for the transaction to confirm
    const receipt = await tx.wait();

    console.log(receipt);
}
```



## exit

Allows a user to fill part or all of any number of orders by exiting/selling off a zcToken or nToken position.

Signatures can be supplied as an array of `string` (signature hashes), `Signature` (objects with R, S, V components) or `number[]` (byte arrays).

### Signature

```typescript
exit (o: Order[], a: BigNumberish[], s: SignatureLike[], t: PayableOverrides = {}): Promise<TransactionResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order[]`|An array of order objects to be filled.|
|a|`BigNumberish[]`|An array of order volumes/amounts relative to the passed orders.|
|s|`SignatureLike[]`|An array of valid 132 byte ECDSA signatures relative to the passed orders.|
|t|`PayableOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with an ethers `TransactionResponse` if the contract call succeeds and rejects otherwise.



## cancel

Allows a user to cancel their order(s).

### Signature

```typescript
cancel (o: Order[], t: PayableOverrides = {}): Promise<TransactionResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order[]`|An array of order objects to be cancelled.|
|t|`PayableOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with an ethers `TransactionResponse` if the contract call succeeds and rejects otherwise.



## splitUnderlying

Allows a user to split their underlying tokens into zcTokens and nTokens.

### Signature

```typescript
splitUnderlying (p: Protocols, u: string, m: BigNumberish, a: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the market.|
|u|`string`|The underlying token address of the market.|
|m|`BigNumberish`|The maturity timestamp of the market.|
|a|`BigNumberish`|The amount of underlying to split.|
|t|`PayableOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with an ethers `TransactionResponse` if the contract call succeeds and rejects otherwise.



## combineTokens

Allows a user to combine an equal amount of their zcTokens and nTokens into underlying.

### Signature

```typescript
combineTokens (p: Protocols, u: string, m: BigNumberish, a: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the market.|
|u|`string`|The underlying token address of the market.|
|m|`BigNumberish`|The maturity timestamp of the market.|
|a|`BigNumberish`|The amount of zcTokens/nTokens to combine.|
|t|`PayableOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with an ethers `TransactionResponse` if the contract call succeeds and rejects otherwise.



## redeemZcToken

Allows a user to redeem their zcTokens at maturity.

### Signature

```typescript
redeemZcToken (p: Protocols, u: string, m: BigNumberish, a: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the market.|
|u|`string`|The underlying token address of the market.|
|m|`BigNumberish`|The maturity timestamp of the market.|
|a|`BigNumberish`|The amount of zcTokens to redeem.|
|t|`PayableOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with an ethers `TransactionResponse` if the contract call succeeds and rejects otherwise.



## redeemVaultInterest

Allows a user to redeem the interest generated by their nTokens.

### Signature

```typescript
redeemVaultInterest (p: Protocols, u: string, m: BigNumberish, t: PayableOverrides = {}): Promise<TransactionResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|p|`Protocols`|The protocol enum value of the market.|
|u|`string`|The underlying token address of the market.|
|m|`BigNumberish`|The maturity timestamp of the market.|
|t|`PayableOverrides`|Optional transaction overrides.|

### Returns

A promise that resolves with an ethers `TransactionResponse` if the contract call succeeds and rejects otherwise.
