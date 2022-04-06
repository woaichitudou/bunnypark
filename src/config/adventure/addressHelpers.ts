import addresses from './contracts'
import { getAddress } from '@/config/common/addressHelpers'

// 分享卡-ShardCardNFT.abi--contracts--address
export const getShardCardNFTAddress = (): string => {
  return getAddress(addresses.ShardCardNFT)
}

// Dream系列卡-BunnyCardNFT.abi--contracts--address
export const getBunnyCardNFTAddress = (): string => {
  return getAddress(addresses.BunnyCardNFT)
}

// 兔子盲盒-BunnyBoxNFT.abi--contracts--address
export const getBunnyBoxNFTAddress = (): string => {
  return getAddress(addresses.BunnyBoxNFT)
}

// 飞船-BunnySpaceshipNFT.abi--contracts--address
export const getBunnySpaceshipNFTAddress = (): string => {
  return getAddress(addresses.BunnySpaceshipNFT)
}

// 机队-BunnyFleetNFT.abi--contracts--address
export const getBunnyFleetNFTAddress = (): string => {
  return getAddress(addresses.BunnyFleetNFT)
}

// 兔子购买-BunnyShop.abi--contracts--address
export const getBunnyShopAddress = (): string => {
  return getAddress(addresses.BunnyShop)
}

// 兔子冒险-BunnyVenture.abi--contracts--address
export const getBunnyVentureAddress = (): string => {
  return getAddress(addresses.BunnyVenture)
}
