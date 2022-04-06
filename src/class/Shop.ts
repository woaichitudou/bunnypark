import { Web3Provider } from '@ethersproject/providers'
import BigNumber from 'bignumber.js'
import { estimateGas } from '@/utils/estimateGas'
import sendCard from '@/utils/sendCard'
import { getBoxIdFromLogs } from '@/class/helpers'
import { getCurrencyBalance, securityInterception, getFullDisplayBalance } from '@/utils/formatBalance'
import { setCurrencyAllowance } from '@/utils/approve'
import { getBunnyShopContract, getBunnyBoxNFTContract, getBunnyCardNFTContract } from '@/config/adventure/contractHelpers'
import { getBunnyShopAddress } from '@/config/adventure/addressHelpers'
import { getBGAddress, getUSDTAddress, getBPAddress } from '@/config/common/addressHelpers'
import { cardsMatch, BunnyCardsType } from './const'
import { transferHex, convertLevel, convertType } from './helpers'

class Shop {
  // 解析数据
  setBalanceNumber = (data: BigNumber) => {
    return securityInterception(Number(getCurrencyBalance(new BigNumber(data))), 3)
  }

  /**
   * 查询升一级支付的费用
   * @param payWay 币种类型
   */
  fetchUpgradePayAmount = async (payWay: number): Promise<any> => {
    const contract = getBunnyShopContract()
    const res = await contract.upgradePayAmount(payWay)
    return {
      usdAmount: securityInterception(Number(getFullDisplayBalance(res.usdAmount._hex)), 3),
      payAmount: securityInterception(Number(getFullDisplayBalance(res.payAmount._hex)), 3)
    }
  }

  /**
   * 盲盒售价
   */
  fetchBlindBoxPrice = async (num: number) => {
    const contract = getBunnyShopContract()
    const price = await contract.calcBoxPayBPAmount(num)
    return securityInterception(Number(getFullDisplayBalance(price._hex)), 3)
  }

  fetchCheckInviteTokenId = async (inviteTokenId: number | string): Promise<any> => {
    const contract = getBunnyShopContract()
    let status = true
    try {
      const res = await contract['checkInviteTokenId(uint256)'](Number(inviteTokenId))
      status = res
    } catch (e) {
      status = false
    }
    return status
  }

  /**
   * 盲盒购买
   * @param account
   * @param web3
   * @param count 购买数量
   * @function setCurrencyAllowance() 判断授权或者执行授权过程 返回 boolean
   * @function estimateGas() 合约某个操作需要的gas预测
   */
  buyBlindBox = async (account: string, library: Web3Provider, inviteTokenId: string | number, quantity: any): Promise<any> => {
    const allowance = await setCurrencyAllowance(library, account, getBunnyShopAddress(), getBPAddress())
    if (!allowance) throw new Error('error')
    const contract = await getBunnyShopContract(library.getSigner(account))
    const gasLimit = await estimateGas(contract, 'buyBox', [quantity, inviteTokenId], 1000)
    // 购买
    const tx = await contract.buyBox(quantity, inviteTokenId, { gasLimit })
    const txReceipt = await tx.wait()
    return getBoxIdFromLogs(txReceipt.logs)
  }

  /**
   * 查询开盲盒中的数据
   * @param account
   * @param web3
   * @param boxId
   * @returns
   */
  getBlindBoxDetail = async (account: string, library: Web3Provider, boxId: string) => {
    const contract = getBunnyBoxNFTContract(library.getSigner(account))
    const response = await contract.getOpenBoxForCardAttr(boxId)
    const data =
      response.map((item: any) => {
        const types = BunnyCardsType[item.types]
        const tokenId = transferHex(item.tokenId)
        const kind = convertLevel(tokenId)
        return {
          levelPower: transferHex(item.power) / 100,
          types,
          tokenId,
          kind
        }
      }) ?? []
    return data
  }

  /**
   * 获取用户卡包中所有的卡片
   * @param account
   * @returns
   */
  fetchCardsInfo = async (account: string) => {
    const contract = getBunnyCardNFTContract()
    const res = await contract['listBunnyAttr(address,uint256,uint256)'](account, 0, 0)
    const arr = res.map((item: any) => {
      const types = BunnyCardsType[item.types]
      const name = cardsMatch[types]
      const level = transferHex(item.power)
      const tokenId = transferHex(item.tokenId)
      return {
        kind: item.kind,
        name,
        level,
        types,
        tokenId,
        levelPower: level / 100
      }
    }) || []
    return JSON.parse(JSON.stringify(arr)).reverse()
  }

  /**
   * 转账送卡
   * @param library
   * @param account
   * @param to
   * @param tokenId
   */
  fetchSendCard = async (library: Web3Provider, account: string, to: string, tokenId: string) => {
    const contract = getBunnyCardNFTContract(library.getSigner(account))
    const response = await sendCard({ contract, account, to, id: tokenId })
    return response
  }

  /**
   * 利用当前tokenId换取用户信息
   * @param tokenId
   * @returns
   */

  fetchTokenIdToInfo = async (tokenId: string | number) => {
    const contract = getBunnyCardNFTContract()
    const res = await contract.getBunnyPowerInfo(tokenId)
    return {
      levelPower: transferHex(res.currPower) / 100,
      kind: convertLevel(tokenId),
      type: BunnyCardsType[convertType(tokenId)]
    }
  }

  /**
   * 升级卡片
   * @param account
   * @param web3
   * @param tokenId
   * @param level
   * @param payWay
   */
  fetchUpgradeCardLevel = async (account: string, library: Web3Provider, tokenId: string | number, level: number, payWay: number) => {
    const UsdtAllowance = await setCurrencyAllowance(library, account, getBunnyShopAddress(), getUSDTAddress())
    if (payWay === 1) { // USD&BG
      const BgAllowance = await setCurrencyAllowance(library, account, getBunnyShopAddress(), getBGAddress())
      if (!UsdtAllowance && !BgAllowance) throw new Error('error')
    }
    if (payWay === 2) { // USD&BP
      const BpAllowance = await setCurrencyAllowance(library, account, getBunnyShopAddress(), getBPAddress())
      if (!UsdtAllowance && !BpAllowance) throw new Error('error')
    }
    const contract = getBunnyShopContract(library.getSigner(account))
    const tx = await contract.upgradeCardLevel(tokenId, level, payWay)
    const { blockHash } = await tx.wait()
    return blockHash
  }

  // 过滤获取小兔子卡片
  getSMALLCard = (cards: any) => {
    return cards.filter((item: any) => Number(BunnyCardsType[item.types]) === 3)
  }

  // 过滤获取N, R SR卡片
  getOtherCard = (cards: any) => {
    return cards.filter((item: any) => Number(BunnyCardsType[item.types]) < 3)
  }
}

export default new Shop()
