import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import bep20Abi from './abi/erc20.json'

// 检查地址是否合法
export function isAddress (value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// 需要账号来获取签名信息的合约初始化
export function getSigner (library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

export function getContract (address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function getProviderOrSigner (library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// erc20合约，作为其他合约注册入口
export function getBep20Contract (library: Web3Provider, address: string, account?: string): Contract {
  return getContract(address, bep20Abi, library, account)
}
