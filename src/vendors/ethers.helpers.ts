import { utils } from 'ethers'

export const createOrderKey = (address: string): string => {
  return utils.keccak256(utils.toUtf8Bytes(address + new Date().getTime() / 1000))
}
