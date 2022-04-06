import { ethers } from 'ethers'
import { simpleRpcProvider } from '@/utils/providers'

// Addresses
import { getMulticallAddress } from './addressHelpers'

// ABI files
import bep20Abi from './abi/erc20.json'
import MultiCallAbi from './abi/Multicall.json'

export const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

// 聚合调用合约
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}

// erc20合约，作为其他合约注册入口
export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider): any => {
  return getContract(bep20Abi, address, signer)
}
