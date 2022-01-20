# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.2.2](https://github.com/Swivel-Finance/swivel-js/compare/v2.2.2-next.0...v2.2.2) (2022-01-20)

### [2.2.2-next.0](https://github.com/Swivel-Finance/swivel-js/compare/v2.2.1...v2.2.2-next.0) (2022-01-20)

### [2.2.1](https://github.com/Swivel-Finance/swivel-js/compare/v2.2.0...v2.2.1) (2021-12-16)


### Bug Fixes

* update gas limit optimizations ([b844893](https://github.com/Swivel-Finance/swivel-js/commit/b844893d067a78afcc7911582d8a7bf862a32c34)), closes [#80](https://github.com/Swivel-Finance/swivel-js/issues/80)

## [2.2.0](https://github.com/Swivel-Finance/swivel-js/compare/v2.2.0-next.0...v2.2.0) (2021-12-15)


### Bug Fixes

* **gas-limit:** update `gasOptions` return type ([6e70553](https://github.com/Swivel-Finance/swivel-js/commit/6e70553210e394f3a4d9ddb782339a5501ed14fa))

## [2.2.0-next.0](https://github.com/Swivel-Finance/swivel-js/compare/v2.1.0...v2.2.0-next.0) (2021-12-15)


### Features

* add custom gas limit to contract calls ([2571b3a](https://github.com/Swivel-Finance/swivel-js/commit/2571b3a2b695a45b0fe6f57745994cd286e18912)), closes [#78](https://github.com/Swivel-Finance/swivel-js/issues/78)

## [2.1.0](https://github.com/Swivel-Finance/swivel-js/compare/v2.0.0...v2.1.0) (2021-12-01)


### ⚠ BREAKING CHANGES

* `mature()` and `maturityRate()` have been removed from `MarketPlace` contract;
* `matured()` has been removed from `VaultTracker` contract;
the `Market` interface now has an additional property `maturityRate`

### Bug Fixes

* update contracts post audit ([c8d1135](https://github.com/Swivel-Finance/swivel-js/commit/c8d1135508a933c246fc84e22f1015f4413a4b65))

## [2.0.0](https://github.com/Swivel-Finance/swivel-js/compare/v2.0.0-next.6...v2.0.0) (2021-09-15)


### Bug Fixes

* remove `matureVault` from VaultTracker HOC ([7250525](https://github.com/Swivel-Finance/swivel-js/commit/7250525681f7a8a6afa4a566a01b8cee97a85f76)), closes [#72](https://github.com/Swivel-Finance/swivel-js/issues/72)

## [2.0.0-next.6](https://github.com/Swivel-Finance/swivel-js/compare/v2.0.0-next.5...v2.0.0-next.6) (2021-09-01)


### Bug Fixes

* add `EthersVendor` to entry module's exports ([f8d30dd](https://github.com/Swivel-Finance/swivel-js/commit/f8d30dd79d6052821a8d462f96dc1f8182827fee)), closes [#65](https://github.com/Swivel-Finance/swivel-js/issues/65)
* add `swivel` getter to VaultTracker HOC ([6f28653](https://github.com/Swivel-Finance/swivel-js/commit/6f286537b1e5aef0ee89c92717b86e5d274de99f)), closes [#67](https://github.com/Swivel-Finance/swivel-js/issues/67)
* move `redeem` methods to swivel HOC ([c62944b](https://github.com/Swivel-Finance/swivel-js/commit/c62944b8387e726374ad14529a699d3aafb233b0)), closes [#69](https://github.com/Swivel-Finance/swivel-js/issues/69)

## [2.0.0-next.5](https://github.com/Swivel-Finance/swivel-js/compare/v2.0.0-next.4...v2.0.0-next.5) (2021-08-29)


### Bug Fixes

* linting issues and doc comments ([5291f46](https://github.com/Swivel-Finance/swivel-js/commit/5291f46b90605f36eea7a22313b66de859b91245))
* rename `DOMAIN` getter to `domain` ([19be364](https://github.com/Swivel-Finance/swivel-js/commit/19be36487fa0a61336f2fa8e29d39e9764d45664))
* update ABIs to latest version ([7754e9b](https://github.com/Swivel-Finance/swivel-js/commit/7754e9bdba1935ef52d1f63121922aeac660082f))

## [2.0.0-next.4](https://github.com/Swivel-Finance/swivel-js/compare/v2.0.0-next.3...v2.0.0-next.4) (2021-06-25)


### Features

* add vault tracker HOC ([20e683d](https://github.com/Swivel-Finance/swivel-js/commit/20e683d4fc627b530ede5aafd5a70a84a2f36a51)), closes [#43](https://github.com/Swivel-Finance/swivel-js/issues/43)


### Bug Fixes

* clean up MarketPlace HOC ([ee79cc5](https://github.com/Swivel-Finance/swivel-js/commit/ee79cc55a78ac9841fe3117373fe1fdafffdc937)), closes [#62](https://github.com/Swivel-Finance/swivel-js/issues/62)

## [2.0.0-next.3](https://github.com/Swivel-Finance/swivel-js/compare/v2.0.0-next.2...v2.0.0-next.3) (2021-06-22)


### Bug Fixes

* marketplace getters for mappings ([4742469](https://github.com/Swivel-Finance/swivel-js/commit/4742469fd8548c7c0100fdf25313fb6bca13a816)), closes [#57](https://github.com/Swivel-Finance/swivel-js/issues/57) [#58](https://github.com/Swivel-Finance/swivel-js/issues/58) [#59](https://github.com/Swivel-Finance/swivel-js/issues/59) [#56](https://github.com/Swivel-Finance/swivel-js/issues/56)

## [2.0.0-next.2](https://github.com/Swivel-Finance/swivel-js/compare/v2.0.0-next.1...v2.0.0-next.2) (2021-06-08)


### Bug Fixes

* don't import abis from `.json` files ([c9b781e](https://github.com/Swivel-Finance/swivel-js/commit/c9b781e151a187ce317615cfa01feb94978a2eeb)), closes [#54](https://github.com/Swivel-Finance/swivel-js/issues/54)

## [2.0.0-next.1](https://github.com/Swivel-Finance/swivel-js/compare/v2.0.0-next.0...v2.0.0-next.1) (2021-06-07)


### Bug Fixes

* add missing getters to swivel and marketplace contracts ([8f9231f](https://github.com/Swivel-Finance/swivel-js/commit/8f9231f64b5860f4d06566e0933d06bf13d4788c))
* unwrap ethers.js `Result` objects ([34ff3b4](https://github.com/Swivel-Finance/swivel-js/commit/34ff3b421c2f367f5c53c7846e6bd5ab2bf49b62)), closes [#49](https://github.com/Swivel-Finance/swivel-js/issues/49)
* update/add contract abi's ([b6a0938](https://github.com/Swivel-Finance/swivel-js/commit/b6a09387c5879ec07d3ce8f761900c9579341556)), closes [#53](https://github.com/Swivel-Finance/swivel-js/issues/53)

## [2.0.0-next.0](https://github.com/Swivel-Finance/swivel-js/compare/v1.0.2...v2.0.0-next.0) (2021-06-04)


### ⚠ BREAKING CHANGES

* new Swivel API

### Features

* rewrite swivel client and tests ([6edda1c](https://github.com/Swivel-Finance/swivel-js/commit/6edda1cfa99e3c962790b5d3decc259927492822))


### Bug Fixes

* consolidate exposed marketplace methods ([8ca2fe6](https://github.com/Swivel-Finance/swivel-js/commit/8ca2fe667bda5a536d7004c07b1a33fa9493aa0b))
* prepare npm package ([fa6ae0c](https://github.com/Swivel-Finance/swivel-js/commit/fa6ae0cf7b9ff868c5aa7b0f8864670aa6240b16))
