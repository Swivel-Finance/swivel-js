export interface Vault {
    notional: string;
    redeemable: string;
    exchangeRate: string;
}

export interface VaultTrackerContract {

    /**
     * The vault tracker contract address
     */
    address?: string;

    /**
     * Returns the admin address.
     *
     * @remarks
     * This is the marketplace contract address.
     */
    admin (): Promise<string>;

    /**
     * Returns the associated swivel contract address.
     */
    swivel (): Promise<string>;

    /**
     * Returns the maturity timestamp.
     */
    maturity (): Promise<string>;

    /**
     * Returns the maturity rate.
     */
    maturityRate (): Promise<string>;

    /**
     * Returns the cToken address.
     */
    cTokenAddr (): Promise<string>;

    /**
     * Retrieves the vault for a specific owner.
     *
     * @param o - the owner address
     * @returns a {@link Vault} object
     */
    vaults (o: string): Promise<Vault>;

    /**
     * Retrieves the notional and redeemable balances for a specific owner.
     *
     * @param o - the owner address
     * @returns a tuple containing the notional and redeemable balance
     */
    balancesOf (o: string): Promise<[string, string]>;
}
