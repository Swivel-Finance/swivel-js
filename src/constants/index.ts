export * from './abi/index.js';
export * from './error/index.js';
export * from './eip-712.js';

export const DAYS_PER_YEAR = 365;

export const SECONDS_PER_YEAR = 31_536_000;

/**
 * Number of blocks mined per day
 *
 * @remarks
 * Based on the compund docs (https://compound.finance/docs#protocol-math) we
 * assume 13.15 seconds per block which results in 6570 blocks per day.
 * Using this value, the resulting APY calculated from the `supplyRatePerBlock`
 * matches the rates quoted by https://compound.finance/markets.
 */
export const BLOCKS_PER_DAY = 6570;
