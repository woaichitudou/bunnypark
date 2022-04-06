import { ethers } from 'ethers'
import { getContract } from '@/config/common/contractHelpers'

// Addresses
import {
  getBunnyBoxNFTAddress,
  getBunnyCardNFTAddress,
  getBunnyFleetNFTAddress,
  getBunnyShopAddress,
  getBunnySpaceshipNFTAddress,
  getBunnyVentureAddress,
  getShardCardNFTAddress
} from './addressHelpers'

// ABI files
import BunnyShopAbi from './abi/BunnyShop.json'
import BunnyBoxNFTAbi from './abi/BunnyBoxNFT.json'
import ShareCardNFTAbi from './abi/ShareCardNFT.json'
import BunnyCardNFTAbi from './abi/BunnyCardNFT.json'
import BunnyVentureAbi from './abi/BunnyVenture.json'
import BunnyFleetNFTAbi from './abi/BunnyFleetNFT.json'
import BunnySpaceshipNFTAbi from './abi/BunnySpaceshipNFT.json'

// 分享卡-ShardCardNFT.abi--contracts--address--init
export const getShardCardNFTContract = (signer?: ethers.Signer | ethers.providers.Provider): any => {
  return getContract(ShareCardNFTAbi, getShardCardNFTAddress(), signer)
}

// 系列卡-BunnyCardNFT.abi--contracts--address--init
export const getBunnyCardNFTContract = (signer?: ethers.Signer | ethers.providers.Provider): any => {
  return getContract(BunnyCardNFTAbi, getBunnyCardNFTAddress(), signer)
}

// 兔子盲盒-BunnyBoxNFT.abi--contracts--address--init
export const getBunnyBoxNFTContract = (signer?: ethers.Signer | ethers.providers.Provider): any => {
  return getContract(BunnyBoxNFTAbi, getBunnyBoxNFTAddress(), signer)
}

// 飞船-BunnySpaceshipNFT.abi--contracts--address--init
export const getBunnySpaceshipNFTContract = (signer?: ethers.Signer | ethers.providers.Provider): any => {
  return getContract(BunnySpaceshipNFTAbi, getBunnySpaceshipNFTAddress(), signer)
}

// 机队-BunnyFleetNFT.abi--contracts--address--init
export const getBunnyFleetNFTContract = (signer?: ethers.Signer | ethers.providers.Provider): any => {
  return getContract(BunnyFleetNFTAbi, getBunnyFleetNFTAddress(), signer)
}

// 兔子购买-BunnyShop.abi--contracts--address--init
export const getBunnyShopContract = (signer?: ethers.Signer | ethers.providers.Provider): any => {
  return getContract(BunnyShopAbi, getBunnyShopAddress(), signer)
}

// 兔子冒险-BunnyVenture.abi--contracts--address--init
export const getBunnyVentureContract = (signer?: ethers.Signer | ethers.providers.Provider): any => {
  return getContract(BunnyVentureAbi, getBunnyVentureAddress(), signer)
}
