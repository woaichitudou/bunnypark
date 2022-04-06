export interface Address {
  97: string
  56: string

  [key: string]: string
}

export interface Token {
  name?: string
  symbol?: string
  address: Address
  decimals: number
  projectLink?: string
}

export interface City {
  cityId: number
  cityName: string
  capacity: number
  ticket: number
  ratio: number
  projectedEarnings: string
  contractAddress: string
}

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97
}

export type MultiCallResponse<T> = T | null
