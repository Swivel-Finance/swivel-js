# Terms

Swivel v3 integrates with multiple lending protocols, including:

- Compound
- Rari
- Aave
- Euler
- Yearn
- ERC-4626 based lending protocols

Each of these lending protocols have slightly different mechanics/implementations. Swivel tries to abstract these
differences away for users and provide a single entry point to fixed and amplified yield lending on either of these
protocols.

## Compounding Token

When supplying underlying to a lending protocol, one typically receives a token in exchange which can be redeemed at a 
later time for the amount of underlying lent plus any interest generated over the lending period.

Different lending protocols issue different tokens, e.g.

- Compound: cToken (https://compound.finance/docs/ctokens)
- Rari: fToken (https://docs.rari.capital/fuse/#ftoken-s)
- Aave: aToken (https://docs.aave.com/developers/tokens/atoken)
- Euler: eToken (https://docs.euler.finance/developers/contract-reference#ieuleretoken)
- Yearn: yVault Token (https://docs.yearn.finance/getting-started/products/yvaults/vault-tokens)
- ERC-4626: https://eips.ethereum.org/EIPS/eip-4626

Swivel coins the term "Compounding Token" to refer to these tokens in general, emphasizing the notion that these tokens
accrue (*compound*) interest over time. The mechanics behind each of the different compound tokens might be different,
but a common denominator is the idea, that compounding tokens can be exchanged at a later time for the amount of
underlying lent plus the corresponding amount of accrued interest.

One can understand a compounding token as a **share** of the total amount of underlying in a lending protocol's 
pool/market.

## exchangeRate

As time progresses, the amount of underlying in a lending pool/market generally increases (due to interest payments
from borrowers). This increase represents the interest generated by a pool/market and lending protocols distribute this
interest in one way or another to the lenders - typically by means of establishing a **ratio** between the supplied 
underlying (by lenders) and the total (ever increasing) amount of underlying in the pool/market.

This ratio is often referred to as **exchange rate**. Generally speaking, the exchange rate establishes a 
**price per share**. If a compounding token represents a share of the total assets in a pool/market, the exchange rate
represents how much underlying a compounding token can be exchanged for at a given time.

It is important to note, that different lending protocols express this ratio in different ways (they might scale an 
`int` value by the amount of underlying token decimals or use a completely different scale to achieve higher precision),
and Swivel does **not** attempt to normalize these scales.

## interestRate

In most cases, users are less interested in the current exchange rate of a lending protocol, but more interested in 
projected annual percentage yield (APY) of a lending protocol, as this let's us compare the projected yield of a 
lending protocol using a normalized and more familiar metric.

A protocol's interest rate can usually be calculated from its exchange rate, by compounding the generated interest over
the duration of a year. In addition, any protocol fees are subtracted from the result to obtain a clear net APY.

Swivel provides the interest rates for each integrated protocol as a floating point number, normalized as percentage.

# Protocol Links

## Compound & Rari

https://compound.finance/docs/ctokens#exchange-rate

https://compound.finance/docs#protocol-math

```
Cerc20(a).exchangeRateCurrent();
Cerc20(a).supplyRatePerBlock();
```

## ERC-4626

https://eips.ethereum.org/EIPS/eip-4626

```
IErc4626(a).convertToAssets(1e26);
```

The ERC-4626 token standard doesn't have a supply rate or APY.

## Yearn

https://docs.yearn.finance/vaults/smart-contracts/vault#pricepershare

A market's `cTokenAddr` for Yearn is the yearn vault address.

```
Vault(a).pricePerShare();
```

https://docs.yearn.finance/vaults/yearn-api

```ts
const chain = 1;
const vaults = await fetch(`https://api.yearn.finance/v1/chains/${ chain }/vaults/all`);
```

|Field          |Description|
|---            |---|
|apy            |Vault APY metadata|
|apy.net_apy	|Net APY (compounded) after fees. This is what the UI shows|

## Aave

https://docs.aave.com/risk/liquidity-risk/borrow-interest-rate#deposit-apy

https://docs.aave.com/developers/v/2.0/the-core-protocol/lendingpool#getreservenormalizedincome

A market's cTokenAddr is the aToken, from which you can get the `POOL()`.

```
pool = AToken(a).POOL();
underlying = AToken(a).UNDERLYING_ASSET_ADDRESS();

LendingPool(pool).getReserveNormalizedIncome(underlying);
```

https://docs.aave.com/developers/v/2.0/guides/apy-and-apr

https://docs.aave.com/developers/v/2.0/the-core-protocol/lendingpool#getreservedata

The `ReserveData` struct contains the `currentLiquidityRate` which is needed to calculate the pool's APY.

```
pool = AToken(a).POOL();
underlying = AToken(a).UNDERLYING_ASSET_ADDRESS();

LendingPool(pool).getReserveData(underlying);
```

## Euler

https://docs.euler.finance/developers/contract-reference#convertbalancetounderlying

```
IEulerToken(a).convertBalanceToUnderlying(1e26);
```

https://docs.euler.finance/developers/contract-reference#interestrate

https://github.com/euler-xyz/euler-contracts/blob/master/contracts/views/EulerGeneralView.sol#L181-L187

Calculating the interest rate (APY) for Euler is pretty involved, see the link above for implementation details.