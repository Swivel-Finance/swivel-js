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

## Installing ethers.js

To use Swivel-JS you'll need to install ethers.js (`^5.2.0`). 

```bash
npm install --save ethers
```

> If demand for web3.js support is high, we'll consider supporting it in future releases.

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

### Swivel

#### Create a Swivel instance

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

#### Sign an order

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

#### Fill an order

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

### MarketPlace

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

### VaultTracker

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

## Deployed Contract Addresses
To connect a Swivel or MarketPlace instance to the deployed contract on the Ethereum network, you'll need to know the contract address. You can find the currently deployed addresses here: https://github.com/Swivel-Finance/swivel#current-deployments

## Other Providers

You can use ethers.js to connect to the Ethereum network in different ways, not only using MetaMask. Please refer to the ethers.js documentation for different ways to connect: https://docs.ethers.io/v5/getting-started/#getting-started--connecting.

Once you have created a provider and a signer, creating a Swivel, MarketPlace or VaultTracker instance is identical to the steps illustrated above.
