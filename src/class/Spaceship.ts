import { isEmpty, times } from 'lodash'
import BigNumber from 'bignumber.js'
import { Web3Provider } from '@ethersproject/providers'

import sendCard from '@/utils/sendCard'
import multicall from '@/utils/multicall'
import { BunnyCardsType } from '@/class/const'
import { estimateGas } from '@/utils/estimateGas'
import { setContractApprove, setCurrencyAllowance } from '@/utils/approve'
import { getFullDisplayBalance } from '@/utils/formatBalance'
import { getBPAddress } from '@/config/common/addressHelpers'
import { getBunnyShopAddress, getBunnyVentureAddress } from '@/config/adventure/addressHelpers'
import { convertLevel as convert, transferHex } from '@/class/helpers'
import {
  getBunnyCardNFTContract,
  getBunnyShopContract,
  getBunnySpaceshipNFTContract
} from '@/config/adventure/contractHelpers'

import BunnyShopAbi from '@/config/adventure/abi/BunnyShop.json'

class Spaceship {
  /**
   * 送卡
   * @param library
   * @param account
   * @param to
   * @param tokenId
   */
  sendSpaceshipCard = async (library: Web3Provider, account: string, to: string, tokenId: string) => {
    const address = getBunnyVentureAddress()
    const contract = getBunnySpaceshipNFTContract(library.getSigner(account))

    const isApproved = await setContractApprove(contract, library, account, address)

    if (!isApproved) return null

    const response = await sendCard({ contract, account, to, id: tokenId })
    return response
  }

  /**
   * 查询飞船
   * @param library
   * @param account
   */
  querySpaceshipsInfo = async (library: Web3Provider, account: string) => {
    const contract = getBunnySpaceshipNFTContract(library)
    const response = await contract.tokensOf(account, 0, 0)
    if (!isEmpty(response)) {
      return response.map((ship: BigNumber) => ({
        seat: convert(ship),
        shipId: transferHex(ship)
      })).reverse()
    }
    return []
  }

  /**
   * 查询兔子卡
   * @param library
   * @param account
   */
  queryBunnyCardsInfo = async (library: Web3Provider, account: string) => {
    const contract = getBunnyCardNFTContract(library)

    const response = await contract['listBunnyAttr(address,uint256,uint256)'](account, 0, 0)
    // console.info(response)
    if (!isEmpty(response)) {
      return response.map(({ power, tokenId, types, kind }: any) => {
        const _power = transferHex(power)
        const _level = parseInt(String(power / 100))
        return ({
          level: _level,
          power: _power,
          type: BunnyCardsType[types],
          tokenId: transferHex(tokenId),
          kind: types === 3 ? '' : kind // BABY 卡没有kind 未来可能是数组 TODO
        })
      }).reverse()
    }
    return []
  }

  /**
   * 查询购买飞船价格
   */
  queryPurchasePriceOfShips = async () => {
    const address = getBunnyShopAddress()
    const baseParams = { address, name: 'calcSpaceshipPayBPAmount' }
    const calls = times(4, (index) => ({ ...baseParams, params: [(index + 1) * 2, 1] }))
    const response = await multicall(BunnyShopAbi, calls)
    if (!isEmpty(response)) {
      return (response.map(({ payBPAmount }: any, index: number) => ({
        seat: (index + 1) * 2,
        price: getFullDisplayBalance(payBPAmount._hex)
      })))
    }
    return []
  }

  /**
   * 购买飞船
   * @param library
   * @param account
   * @param seat
   * @param count
   */
  purchaseAspacecraft = async (library: Web3Provider, account: string, seat: number, count: number): Promise<boolean> => {
    let status: boolean
    const contract = getBunnyShopContract(library.getSigner(account))

    const allowance = await setCurrencyAllowance(library, account, getBunnyShopAddress(), getBPAddress())
    if (!allowance) return false

    try {
      const gasLimit = await estimateGas(contract, 'buySpaceship', [seat, count])
      const response = await contract.buySpaceship(seat, count, { gasLimit })
      const receipt = await response.wait()
      status = receipt.status
    } catch (e) {
      console.error(e)
      status = false
    }

    return status
  }
}

export default new Spaceship()
