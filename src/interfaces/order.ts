export interface Order {
  key: string
  maker: string
  underlying: string
  floating: boolean
  principal: string
  interest: string
  duration: string
  expiry: string
}

export interface VendorOrder {
  key: any
  maker: any
  underlying: any
  floating: any
  principal: any
  interest: any
  duration: any
  expiry: any
}
