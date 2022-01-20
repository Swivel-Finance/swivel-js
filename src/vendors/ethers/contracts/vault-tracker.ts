import { Contract, ethers, Signer } from 'ethers';
import { Abi, Vault, VaultTrackerContract } from '../../../interfaces/index.js';
import { fromBigNumber, unwrap } from '../utils/index.js';

/**
 * An internal type solely for ethers.js vault struct response.
 *
 * @internal
 */
type VaultResponse = ethers.BigNumber[] & {
    notional: ethers.BigNumber;
    redeemable: ethers.BigNumber;
    exchangeRate: ethers.BigNumber;
};

export class EthersVaultTrackerContract implements VaultTrackerContract {

    protected contract: Contract;

    /**
     * The vault tracker contract address
     */
    address: string;

    /**
     * Creates a new ethers.js specific vault tracker contract wrapper.
     *
     * @param address - address of the deployed vault tracker contract
     * @param abi - the abi of the vault tracker contract
     * @param s - an ethers.js signer instance
     */
    constructor (address: string, abi: Abi, s: Signer) {

        this.contract = new Contract(address, abi, s);
        this.address = this.contract.address;
    }

    /**
     * Returns the admin address.
     *
     * @remarks
     * This is the marketplace contract address.
     */
    async admin (): Promise<string> {

        return unwrap<string>(await this.contract.functions.admin());
    }

    /**
     * Returns the associated swivel contract address.
     */
    async swivel (): Promise<string> {

        return unwrap<string>(await this.contract.functions.swivel());
    }

    /**
     * Returns the maturity timestamp.
     */
    async maturity (): Promise<string> {

        const maturity = unwrap<ethers.BigNumber>(await this.contract.functions.maturity());

        return fromBigNumber(maturity);
    }

    /**
     * Returns the maturity rate.
     */
    async maturityRate (): Promise<string> {

        const maturityRate = unwrap<ethers.BigNumber>(await this.contract.functions.maturityRate());

        return fromBigNumber(maturityRate);
    }

    /**
     * Returns the cToken address.
     */
    async cTokenAddr (): Promise<string> {

        return unwrap<string>(await this.contract.functions.cTokenAddr());
    }

    /**
     * Retrieves the vault for a specific owner.
     *
     * @param o - the owner address
     * @returns a {@link Vault} object
     */
    async vaults (o: string): Promise<Vault> {

        // ethers.js returns structs unwrapped
        const vault = await this.contract.functions.vaults(o) as VaultResponse;

        return {
            notional: fromBigNumber(vault.notional),
            redeemable: fromBigNumber(vault.redeemable),
            exchangeRate: fromBigNumber(vault.exchangeRate),
        };
    }

    /**
     * Retrieves the notional and redeemable balances for a specific owner.
     *
     * @param o - the owner address
     * @returns a tuple containing the notional and redeemable balance
     */
    async balancesOf (o: string): Promise<[string, string]> {

        // ethers.js returns tuples unwrapped
        const [notional, redeemable] = await this.contract.functions.balancesOf(o) as [ethers.BigNumber, ethers.BigNumber];

        return [fromBigNumber(notional), fromBigNumber(redeemable)];
    }
}
