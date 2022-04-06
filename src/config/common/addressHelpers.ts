import { Address, ChainId } from '@/config/types'
import addresses from '@/config/common/contracts'
import tokens from '@/config/common/tokens'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID ?? '56'
  return address[chainId] != null ? address[chainId] : address[ChainId.MAINNET]
}

// 聚合调用合约地址
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}

// BP token 地址
export const getBPAddress = (): string => {
  return getAddress(tokens.bp.address)
}

// BG token 地址
export const getBGAddress = (): string => {
  return getAddress(tokens.bg.address)
}

// USDT token 地址
export const getUSDTAddress = (): string => {
  return getAddress(tokens.usdt.address)
}
