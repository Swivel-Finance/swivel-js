/**
 * The protocols enum is used to easily identify a protocol id.
 */
export const enum Protocols {
    Frax,
    Compound,
    Rari,
    Yearn,
    Aave,
    Euler,
    Lido,
}

/**
 * The protocol of any order or market can be specified using the named {@link Protocols} enum or a plain number.
 *
 * @description
 * We allow plain numbers to keep the `swivel-js` implementation open to future protocol additions.
 * We can release new versions of `swivel-js` with an updated `Protocols` enum over time,
 * however things won't break if a new protocol is added and the `Protocols` enum isn't updated.
 */
export type Protocol = Protocols | number;
