import { Contract } from 'ethers'
import BigNumber from 'bignumber.js'
import { MaxUint256 } from '@ethersproject/constants'
import { Web3Provider } from '@ethersproject/providers'

import { BIG_ZERO } from '@/config'
import { getBPAddress } from '@/config/common/addressHelpers'
import { getBep20Contract } from '@/config/common/signerContract'

const BIG_MIN_LIMIT = new BigNumber(37990).times(1e18)

/**
 * 币种的判断以及授权最大额度
 * @param library
 * @param account
 * @param spenderAddress 授权给目标合约的地址
 * @param tokenAddress?   目标币种，默认 BP
 * @return boolean 已授权或者已完成授权过程
 */
export const setCurrencyAllowance = async (library: Web3Provider, account: string, spenderAddress: string, tokenAddress?: string): Promise<boolean> => {
  let status: boolean
  let allowance: BigNumber = BIG_ZERO

  const address = tokenAddress ?? getBPAddress()
  const c: Contract = getBep20Contract(library, address, account)

  try {
    const response = await c.allowance(account, spenderAddress)
    allowance = new BigNumber(String(response))

    if (!allowance.isGreaterThan(BIG_MIN_LIMIT)) {
      const tx = await c.approve(spenderAddress, MaxUint256)
      const receipt = await tx.wait()
      status = receipt.status
    } else status = true
  } catch (e) {
    console.error(e)
    status = false
  }

  return status
}

/**
 * A合约授权给B合约
 * @param contract A合约
 * @param library
 * @param account
 * @param spenderAddress 授权给目标B合约的地址
 * @return boolean 已授权或者已完成授权过程
 * 比如：NFT车卡合约授权给车卡挖矿的合约
 */
export const setContractApprove = async (contract: Contract, library: Web3Provider, account: string, spenderAddress?: string): Promise<boolean> => {
  let status: boolean

  try {
    const response = await contract.isApprovedForAll(account, spenderAddress)

    if (!response) {
      const tx = await contract.setApprovalForAll(spenderAddress, true)
      const receipt = await tx.wait()
      status = receipt.status
    } else status = true
  } catch (e) {
    console.error(e)
    status = false
  }

  return status
}
