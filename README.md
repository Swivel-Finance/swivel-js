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

```typescript
import { ethers } from 'ethers';
import { EthersVendor, Swivel } from '@swivel-finance/swivel-js';

// create a provider and signer using ethers.js - this example uses
// metamask's window.ethereum to create an ethers provider
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// to use swivel-js with ethers.js, create an EthersVendor using the 
// provider and signer you just created
const vendor = new EthersVendor(provider, signer);

// you'll also need to know the chain id of the network you want to use
// as well as the address of the deployed Swivel contract on that network
const chainId = 4;
const swivelAddress = '0xDe9a819630094dF6dA6FF7CCc77E04Fd3ad0ACFE';
const verifyingContract = swivelAddress;

// create a Swivel instance using the EtherVendor instance
const swivel = new Swivel(vendor, chainId, verifyingContract).at(swivelAddress);
```

### MarketPlace

```typescript
import { ethers } from 'ethers';
import { EthersVendor, Swivel } from '@swivel-finance/swivel-js';

// create a provider and signer using ethers.js - this example uses
// metamask's window.ethereum to create an ethers provider
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// to use swivel-js with ethers.js, create an EthersVendor using the 
// provider and signer you just created
const vendor = new EthersVendor(provider, signer);

// you'll also need to know the address of the deployed MarketPlace 
// contract on the network you want to use
const marketPlaceAddress = '0xeb389e2796E081FBb5C032F3D307CD5E6b438D78';

// create a MarketPlace instance using the EthersVendor instance
const marketPlace = new MarketPlace(vendor).at(marketPlaceAddress);
```

### VaultTracker

```typescript
import { ethers } from 'ethers';
import { EthersVendor, Swivel } from '@swivel-finance/swivel-js';

// create a provider and signer using ethers.js - this example uses
// metamask's window.ethereum to create an ethers provider
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// to use swivel-js with ethers.js, create an EthersVendor using the 
// provider and signer you just created
const vendor = new EthersVendor(provider, signer);

// you'll also need to know the address of the deployed VaultTracker
// a VaultTracker is specific to a market and you can retrieve its
// address by using the `markets` method of the MarketPlace contract

// first you need to identify a market by its underlying and maturity:
// - underlying is the market's underlying token address, e.g. 
//   the address of the DAI or USDC token contract
const underlying = '0x123456789';
// - maturity is the market's maturity timestamp in seconds
const maturity = 1631638105;

// assuming you already created a MarketPlace instance (as shown above)
const addresses = await marketPlace.markets(underlying, maturity);
const vaultAddress = addresses.vaultAddr;

// create a VaultTracker instance using the EtherVendor instance
const vaultTracker = new VaultTracker(vendor).at(vaultAddress);
```
### Code Example: Consuming an order

```typescript
import { ethers } from "ethers";
import { EthersVendor, Swivel } from '@swivel-finance/swivel-js';
import { DAI_ABI } from './constants.js';

// @param amount of volume to fill
async marketOrderFixed(amount) {
  //initialize ethers provider & signer
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // initialize EthersVender for Swivel consumpion
  const vendor = new EthersVendor(provider, signer);
  // constants for Swivel on rinkeby
  const chainId = 4;
  const swivelAddress = '0xDe9a819630094dF6dA6FF7CCc77E04Fd3ad0ACFE';
  const daiAddress = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa';
  const verifyingContract = swivelAddress;
  // initialize swivel wrapper and DAI contract
  const swivel = new Swivel(vendor, chainId, verifyingContract).at(swivelAddress);
  const DAI = new ethers.Contract(daiAddress, DAI_ABI, provider);
  // check approvals, if not approved approve max uint
  const approvalAmount = await DAI.allowance(window.ethereum.selectedAddress,swivelAddress);
  if (approvalAmount < amount) {
  const approve = await this._Dai.approve(swivelAddress, constants.MaxUint256);
  await approve.wait();
  }
  // hardcoded nToken purchase order (vault initiate) + signature valid on rinkeby. Can replace with FillPreview API fetch.
  var order = 
    {
      key: "0x3449db081da0329d51b6757809ce4c1042ea0c110b8980628e46cb4d4b8297fb",
      maker: "0x3f60008Dfd0EfC03F476D9B489D6C5B13B3eBF2C",
      underlying: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
      vault: true,
      exit: false,
      principal: "40000000000000000000000",
      premium: "2000000000000000000000",
      maturity: "1662089767",
      expiry: "1633324220",
    };
  var signature = "0x2ab021d3577a940b6d2b2f47288dc240fb003c24d0af93751bd3b9354e1df0d03e6d2c47a7bf566d6ec887b6884edb80c80f0890d247a363eb31b1e99d5636ae1c";

  // amount, normalized for 18 decimals of DAI, transformed into easily consumable string.
  const normalizedAmount = (amount*10e18).toString();

  // fill the hardcoded order by initiating your position. Each param is within an array, as multiple orders can be filled at once.
  const tx = await swivel.initiate([order],[normalizedAmount],[signature]);
  console.log(tx);
  const receipt = await tx.wait();
}
```

### Deployed Contract Addresses
To connect a Swivel or MarketPlace instance to the deployed contract on the Ethereum network, you'll need to know the contract address. You can find the currently deployed addresses here: https://github.com/Swivel-Finance/swivel#current-deployments

### Other Providers

You can use ethers.js to connect to the Ethereum network in different ways, not only using MetaMask. Please refer to the ethers.js documentation for different ways to connect: https://docs.ethers.io/v5/getting-started/#getting-started--connecting.

Once you have created a provider and a signer, creating a Swivel, MarketPlace or VaultTracker instance is identical to the steps illustrated above.
