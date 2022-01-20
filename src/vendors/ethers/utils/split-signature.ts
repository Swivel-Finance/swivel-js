import { utils } from 'ethers';
import { Signature } from '../../../interfaces/index.js';

/**
 * Split a signature hash into its components.
 *
 * @remarks
 * `ethers.utils.splitSignature()` takes care of normalizing the signature's
 * `v` parameter and ensuring it is in [27, 28].
 *
 * @param s - signature hash string
 */
export function splitSignature (s: string): Signature {

    return utils.splitSignature(s);
}
