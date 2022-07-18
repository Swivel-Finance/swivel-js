# Terms 

## exchangeRate

A compounding token's exchange rate determines how much underlying the compounding token is currently worth, or in other terms, how many base units of underlying can 1 compounding token be exchanged for.

## supplyRate - apy/interestRate

A compounding token's supply rate is essentially the token's (compounded) lending interest rate. Depending on the protocol, this rate can be expressed in terms of rate per block (i.e. compound, rari), per second (i.e. Aave, Euler), or per year (Yearn?). In general this rate should be annualized to make it comparable to traditional APYs.

# Protocols

## Compound & Rari

https://compound.finance/docs/ctokens#exchange-rate

https://compound.finance/docs#protocol-math

```ts
// normalize the exchange rate to the decimals of the underlying
const exchangeRate = cToken.exchangeRate && fixed(contractAmount(cToken.exchangeRate, 18 - cToken.decimals + underlying.decimals)).toString(),
```

```ts
// annualize the supply rate per block
const supplyRate = cToken.supplyRatePerBlock && (Math.pow(Number(cToken.supplyRatePerBlock) / Math.pow(10, 18) * BLOCKS_PER_DAY + 1, DAYS_PER_YEAR) - 1).toString()
```

## ERC-4626

https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/#exchangerate

```
IErc4626(c).convertToAssets(1e26);
```

The ERC-4626 token standard doesn't seem to have a supply rate or apy...?

## Yearn

A market's cTokenAddr for Yearn is the yearn vault address.

https://docs.yearn.finance/vaults/smart-contracts/VaultAPI#pricepershare

https://docs.yearn.finance/vaults/smart-contracts/vault#pricepershare

Yearn's yToken doesn't have an exchange rate, but vaults have a price per share, which might be the equivalent.

https://docs.yearn.finance/vaults/yearn-api

```ts
const endpoint = 'https://api.yearn.finance/v1/chains/1/vaults/all'
```

|Field          |Description|
|---            |---|
|apy            |Vault APY metadata|
|apy.net_apy	|Net APY (compounded) after fees. This is what the UI shows|

## Aave

A market's cTokenAddr is the aToken, from which you can get the `POOL()`.

https://docs.aave.com/risk/liquidity-risk/borrow-interest-rate#deposit-apy

https://docs.aave.com/developers/v/2.0/guides/apy-and-apr

https://docs.aave.com/developers/v/2.0/the-core-protocol/lendingpool#getreservenormalizedincome

## Euler

https://docs.euler.finance/developers/contract-reference#interestrate

The interest rate in yield-per-second, scaled by 10**27

IEulerToken(c).convertBalanceToUnderlying(1e26);

https://github.com/euler-xyz/euler-contracts/blob/master/contracts/views/EulerGeneralView.sol#L181-L187
