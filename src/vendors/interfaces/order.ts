import { ethers } from 'ethers'

export interface ValidOrder {
  key: string
  maker: string
  underlying: string
  floating: boolean
  principal: ethers.BigNumber
  interest: ethers.BigNumber
  duration: ethers.BigNumber
  expiry: ethers.BigNumber
  nonce: ethers.BigNumber
}

export interface OrderMeta {
  filling: ethers.BigNumber
  agreementKey: string
}
