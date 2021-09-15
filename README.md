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

### Deployed Contract Addresses
To connect a Swivel or MarketPlace instance to the deployed contract on the Ethereum network, you'll need to know the contract address. You can find the currently deployed addresses here: https://github.com/Swivel-Finance/swivel#current-deployments

### Other Providers

You can use ethers.js to connect to the Ethereum network in different ways, not only using MetaMask. Please refer to the ethers.js documentation for different ways to connect: https://docs.ethers.io/v5/getting-started/#getting-started--connecting.

Once you have created a provider and a signer, creating a Swivel, MarketPlace or VaultTracker instance is identical to the steps illustrated above.
