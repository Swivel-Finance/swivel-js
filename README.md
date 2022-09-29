[![Build Status](https://travis-ci.com/Swivel-Finance/swivel-js.svg?token=mHzJQzb11WHSPwztZw8B&branch=main)](https://travis-ci.com/Swivel-Finance/swivel-js)
```
     _______.____    __    ____  __  ____    ____  _______  __                 __       _______.
    /       |\   \  /  \  /   / |  | \   \  /   / |   ____||  |               |  |     /       |
   |   (----` \   \/    \/   /  |  |  \   \/   /  |  |__   |  |               |  |    |   (----`
    \   \      \            /   |  |   \      /   |   __|  |  |         .--.  |  |     \   \    
.----)   |      \    /\    /    |  |    \    /    |  |____ |  `----. __ |  `--'  | .----)   |   
|_______/        \__/  \__/     |__|     \__/     |_______||_______|(__) \______/  |_______/    
```
Javascript library for working with the Swivel Finance Protocol

# Documentation

Find the official documentation for the Swivel protocol at: https://docs.swivel.finance/.

# Installation

## Installing ethers

In order use `swivel-js` you'll need a compatible version (`^5.2.0`) of `ethers`. Being a peer dependency, you can use any compatible version of `ethers` you already have installed in your project. 

If you haven't installed a compatible version of `ethers` in your project yet, run:

```bash
npm install --save ethers
```

## Installing swivel-js

```bash
npm install --save @swivel-finance/swivel-js
```

# Quickstart

Swivel-JS provides implementations for the 3 main contracts of the Swivel protocol:

- Swivel (sign orders, initiate/exit/cancel orders, split/combine/redeem tokens)
- MarketPlace (retrieve token/vault information for a market)
- VaultTracker (retrieve vault information for a market and owner)

In most cases you'll want to use the Swivel contract implementation to work with orders and tokens.

## Usage

### Protocols

Swivel supports 7 different interest-generating protocols and each market on Swivel is tied to a specific protocol. You can select a Protocol using the `Protocols` enum:

```typescript
import { Protocols } from '@swivel-finance/swivel-js';

const protocol = Protocols.Compound;
```

or you can use the Protocol's numeric value:

```typescript
/**
 * The Protocol's numeric values
 * 
 * Erc4626  = 0
 * Compound = 1
 * Rari     = 2
 * Yearn    = 3
 * Aave     = 4
 * Euler    = 5
 * Lido     = 6
 */ 
 
const protocol = 4; // Aave
```

### Swivel

#### Create a Swivel instance

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

#### Sign an order

```typescript
import { Swivel } from '@swivel-finance/swivel-js';
import { ethers, utils } from 'ethers';

// you need the chain id of the network you want to use
const chainId = 1;
// you need the address of the deployed swivel contract on that network
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

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
    principal: '10000000',
    premium: '500000',
    expiry: '1648177200',
};

// you can now sign the order using the Swivel class' static `signOrder` method
const signature = await Swivel.signOrder(order, signer, swivelAddress, chainId);
```

#### Fill an order

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

### MarketPlace

#### Create a MarketPlace instance

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

#### Get the interest rate (supply APY) of a market

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

// you'll need to know the market's protocol (Compound in this example),
const protocol = Protocols.Compound;
// ...underlying (USDC in this example),
const underlying = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
// ... and maturity (30/9/2022 in this example)
const maturity = 1664550000;

// get the market info for a specific market
const market = await marketPlace.markets(protocol, underlying, maturity);

// get the market's interest rate (supply APY)
const interestRate = await marketPlace.interestRate(protocol, market.cTokenAddr);
```

### VaultTracker

```typescript
import { Protocols, VaultTracker } from '@swivel-finance/swivel-js';
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

// assuming you already created a MarketPlace instance, 
// retrieve the desired market information...
const market = await marketPlace.markets(protocol, underlying, maturity);
// ...and extract the `vaultTracker` of the market
const vaultAddress = market.vaultTracker;

// use the `signer` and `vaultAdrress` to instantiate the VaultTracker
const vaultTracker = new VaultTracker(vaultAddress, signer);
```

### Error Handling

The Swivel protocol uses [solidity custom errors](https://blog.soliditylang.org/2021/04/21/custom-errors/) throughout to provide additional error context to consumers through error parameters. Swivel relies on a single custom error interface to do so:

```solidity
error Exception(uint8 code, uint256 amountReceived, uint256 amountExpected, address addressReceived, address addressExpected);
```

Each error has a unique `code` and, depending on the `code`, the `amount` and `address` parameters will be set to provide relevant context to the error instance.

`swivel-js` provides helpers to easily extract custom error data from failed transactions, as well as a mapping of `Exception` codes to human-readable error names and fully formatted error messages. The easiest way to handle custom errors using `swivel-js` is by using the `parseSwivelError` method:

```typescript
import { parseSwivelError, Swivel } from '@swivel-finance/swivel-js';
import { ethers } from 'ethers';

// you need the address of the deployed swivel contract on the connected network
const swivelAddress = '0x3b983B701406010866bD68331aAed374fb9f50C9';

// create an ethers provider and signer,...
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// ...and use the signer to instantiate the Swivel contract
const swivel = new Swivel(swivelAddress, signer);

// assume you have an order and its signature...
const order = {...};
const signature = '...';

// ...and you'd like to fill the order with 100 underlying
const amount = ethers.utils.parseUnits('100', 18);

// use a try/catch block around your transaction
try {

    const tx = await swivel.initiate([order], [amount], [signature]);

    const receipt = await tx.wait();

} catch (error) {

    // if the transaction fails, you will receive an ethers error which
    // will usually be a `CALL_EXCEPTION` or `UNPREDICTABLE_GAS_LIMIT`
    
    // regardless of the ethers error, you can pass it to the 
    // `parseSwivelError` method, which will extract the custom error
    // data (if it is available) and create a `SwivelError` instance,
    // populating it with a human-readable error name and formatted error message
    // if the ethers error does not contain any custom error data,
    // `parseSwivelError` will return `undefined`
    const swivelError = parseSwivelError(error);

    if (swivelError) {

        // you can notify users with a useful error message
        alert(swivelError.message);
    
    } else {

        // something else went wrong, you'll need to handle the ethers error
    }
}
```

## Deployed Contract Addresses
To connect a Swivel or MarketPlace instance to the deployed contract on the Ethereum network, you'll need to know the contract address. You can find the currently deployed addresses here: https://github.com/Swivel-Finance/swivel#current-deployments

## Other Providers

You can use ethers.js to connect to the Ethereum network in different ways, not only using MetaMask. Please refer to the ethers.js documentation for different ways to connect: https://docs.ethers.io/v5/getting-started/#getting-started--connecting.

Once you have created a provider and a signer, creating a Swivel, MarketPlace or VaultTracker instance is identical to the steps illustrated above.
