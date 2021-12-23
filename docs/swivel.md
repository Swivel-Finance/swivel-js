# Overview

The Swivel contract wrapper allows a user to sign orders; initiate, exit, and cancel orders; as well as split, combine, and redeem their tokens.

An order is a struct of the following shape:

## Order

```typescript
interface Order {
    key: string;
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

## Creating a Swivel instance

The snippet below illustrates how you can create a Swivel instance and what information you need to do so.

```typescript
import { EthersVendor, Swivel } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the chain id of the network you want to use
// this is necessary for signing offline orders
const chainId = 1;
// you need the address of the deployed swivel contract on that network
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...create a Vendor for the Swivel contract,
const vendor = new EthersVendor(provider, signer);

// ...and use the vendor to instantiate the Swivel contract
const swivel = new Swivel(vendor, chainId, swivelAddress).at(swivelAddress);
```



# Properties

## address

Holds the current contract address used by the Swivel instance.

### Signature

```typescript
address?: string;
```



# Getters

## NAME

Allows a user to get the Swivel domain name for EIP-712 signing.

### Signature

```typescript
NAME (): Promise<string>;
```

### Returns

A promise that resolves with the domain name if the contract call succeeds and rejects otherwise.



## VERSION

Allows a user to get the Swivel domain version for EIP-712 signing.

### Signature

```typescript
VERSION (): Promise<string>;
```

### Returns

A promise that resolves with the domain version if the contract call succeeds and rejects otherwise.



## domain

Allows a user to get the Swivel domain for EIP-712 signing.

### Signature

```typescript
domain (): Promise<string>;
```

### Returns

A promise that resolves with the domain if the contract call succeeds and rejects otherwise.



## marketPlace

Allows a user to get the associated MarketPlace contract address.

### Signature

```typescript
marketPlace (): Promise<string>;
```

### Returns

A promise that resolves with the MarketPlace contract's address if the contract call succeeds and rejects otherwise.



# Methods

## constructor

Creates an instance of the Swivel smart contract wrapper.

> After creating an instance of the Swivel contract it can be used to sign offline orders, however it cannot yet interact with the deployed Swivel smart contract on chain. You need to additionally invoke the `at()` method of the Swivel instance to connect the instance with the contract on chain.

> Even though chain-id and contract address are optional parameters for the Swivel constructor, `signOrder()` requires these parameters to be set. If you want to use the Swivel instance to sign offline orders, you **must** provide the paramaters.

### Signature
```typescript
constructor (v: Vendor, i?: number, c?: string): Swivel;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|v|`Vendor`|A vendor instance (ethers.js or web3.js vendor) to use.|
|i|`number`|The chain-id for the deployed Swivel smart contract.|
|c|`string`|The address of the deployed Swivel smart contract.|

### Example

```typescript
import { EthersVendor, Swivel } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the chain id of the network you want to use
const chainId = 1;
// you need the address of the deployed swivel contract on that network
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...create a Vendor for the Swivel contract,
const vendor = new EthersVendor(provider, signer);

// ...and use the vendor to instantiate the Swivel contract
const swivel = new Swivel(vendor, chainId, swivelAddress);
```



## at

Connects a Swivel instance to a deployed Swivel smart contract on chain.

### Signature

```typescript
at (a: string, o?: TxOptions): Swivel;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|a|`string`|The address of the deployed Swivel smart contract.|
|o|`TxOptions`|Optional transaction options to override ethers.js' default transaction options.|

### Returns

The connected Swivel instance.

### Example

```typescript
import { EthersVendor, Swivel } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the chain id of the network you want to use
const chainId = 1;
// you need the address of the deployed swivel contract on that network
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...create a Vendor for the Swivel contract,
const vendor = new EthersVendor(provider, signer);

// ...and use the vendor to instantiate the Swivel contract
// you can chain the `.at()` call directly to the constructor
const swivel = new Swivel(vendor, chainId, swivelAddress).at(swivelAddress);
```



## signOrder

Allows a user to sign an offline order using EIP-712.

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
import { EthersVendor, Swivel } from '@swivel-finance/swivel-js';
import { ethers, utils } from 'ethers';

// you need the chain id of the network you want to use
const chainId = 1;
// you need the address of the deployed swivel contract on that network
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...create a Vendor for the Swivel contract,
const vendor = new EthersVendor(provider, signer);
// ...and use the vendor to instantiate the Swivel contract
const swivel = new Swivel(vendor, chainId, swivelAddress);

// the order maker is your account address
const maker = await signer.getAddress();
// the order key should be a hash of your account address and a timestamp
const key = utils.keccak256(utils.toUtf8Bytes(`${ maker }${ Date.now() }`));
// you will also need the underlying token address and maturity of a market
// you can get them from the Swivel Exchange API
const underlying = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const maturity = '1648177200';

// create an order
const order: Order = {
    key: key,
    maker: maker,
    underlying: underlying,
    maturity: maturity,
    vault: false,
    exit: false,
    principal: '1000',
    premium: '50',
    expiry: '123456789',
};

// you can now sign the order
const signature = await swivel.signOrder(order);
```



## cancelled

Allows a user to check if an order was cancelled.

### Signature

```typescript
cancelled (k: string): Promise<boolean>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|k|`string`|The key of the order to check.|

### Returns

A promise that resolves with `true` or `false` if the contract call succeeds and rejects otherwise.



## filled

Allows a user to retrieve an order's filled volume.

### Signature

```typescript
filled (k: string): Promise<string>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|k|`string`|The key of the order to check.|

### Returns

A promise that resolves with the orders filled volume if the contract call succeeds and rejects otherwise.



## initiate

Allows a user to fill part or all of any number of orders by initiating a fixed-yield (zcToken) or amplified-yield (nToken) position.

Splits an array of `bytes32` signatures into R,S,V, and calls the initiate method on the Swivel.sol contract.

### Signature

```typescript
initiate (o: Order[], a: uint256[], s: string[]): Promise<TxResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order[]`|An array of order objects to be filled.|
|a|`uint256[]`|An array of `uint256` amounts. The amount filled with each o[i] order submitted.|
|s|`string[]`|An array of 132 byte ECDSA signatures associated with each o[i] order submitted.|

### Returns

A promise that resolves with a `TxResponse` if the contract call succeeds and rejects otherwise.

### Example

```typescript
import { EthersVendor, Swivel } from '@swivel-finance/swivel-js';
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

    // create an EthersVender for the Swivel wrapper
    const vendor = new EthersVendor(provider, signer);

    // constants for Swivel on rinkeby (this might be outdated)
    const chainId = 4;
    const swivelAddress = '0xDe9a819630094dF6dA6FF7CCc77E04Fd3ad0ACFE';
    const underlyingAddress = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa';

    // create the Swivel wrapper
    const swivel = new Swivel(vendor, chainId, swivelAddress).at(swivelAddress);

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

Splits an array of `bytes32` signatures into R,S,V, and calls the exit method on the Swivel.sol contract.

### Signature

```typescript
exit (o: Order[], a: uint256[], s: string[]): Promise<TxResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order[]`|An array of order objects to be filled.|
|a|`uint256[]`|An array of `uint256` amounts. The amount filled with each o[i] order submitted.|
|s|`string[]`|An array of 132 byte ECDSA signatures associated with each o[i] order submitted.|

### Returns

A promise that resolves with a `TxResponse` if the contract call succeeds and rejects otherwise.



## cancel

Allows a user to cancel their order.

Splits a `bytes32` signature into R,S,V, and calls the cancel method on the Swivel Brokerage contract. Can only be called by the order's maker.

### Signature

```typescript
cancel (o: Order, s: string): Promise<TxResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|o|`Order`|An order object to be cancelled.|
|s|`string`|The full 132 byte ECDSA signature associated with the order.|

### Returns

A promise that resolves with a `TxResponse` if the contract call succeeds and rejects otherwise.



## splitUnderlying

Allows a user to split their underlying tokens into zcTokens and nTokens.

### Signature

```typescript
splitUnderlying (u: string, m: uint256, a: uint256): Promise<TxResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|u|`string`|The address of the underlying token contract.|
|m|`uint256`|The market's maturity.|
|a|`uint256`|The amount of underlying to split.|

### Returns

A promise that resolves with a `TxResponse` if the contract call succeeds and rejects otherwise.



## splitUnderlying

Allows a user to combine an equal amount of their zcTokens and nTokens into underlying.

### Signature

```typescript
combineTokens (u: string, m: uint256, a: uint256): Promise<TxResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|u|`string`|The address of the underlying token contract.|
|m|`uint256`|The market's maturity.|
|a|`uint256`|The amount of zcTokens/nTokens to combine.|

### Returns

A promise that resolves with a `TxResponse` if the contract call succeeds and rejects otherwise.



## redeemZcToken

Allows a user to redeem their zcTokens at maturity.

### Signature

```typescript
redeemZcToken (u: string, m: uint256, a: uint256): Promise<TxResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|u|`string`|The address of the underlying token contract.|
|m|`uint256`|The market's maturity.|
|a|`uint256`|The amount of zcTokens to redeem.|

### Returns

A promise that resolves with a `TxResponse` if the contract call succeeds and rejects otherwise.



## redeemVaultInterest

Allows a user to redeem the interest generated by their nTokens.

### Signature

```typescript
redeemVaultInterest (u: string, m: uint256): Promise<TxResponse>;
```

### Parameters

|Paramater|Type|Description|
|---------|----|-----------|
|u|`string`|The address of the underlying token contract.|
|m|`uint256`|The market's maturity.|

### Returns

A promise that resolves with a `TxResponse` if the contract call succeeds and rejects otherwise.
