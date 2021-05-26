import { utils } from 'ethers';
export const createKey = (address) => {
    return utils.keccak256(utils.toUtf8Bytes(address + new Date().getTime() / 1000));
};
//# sourceMappingURL=ethers.helpers.js.map