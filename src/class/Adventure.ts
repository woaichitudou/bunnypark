import { isEmpty, times, add } from 'lodash'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'

import { sleep } from '@/utils/tools'
import multicall from '@/utils/multicall'
import { estimateGas } from '@/utils/estimateGas'
import { getFullDisplayBalance } from '@/utils/formatBalance'
import { convertLevel, transferHex, convertType } from './helpers'
import { setContractApprove, setCurrencyAllowance } from '@/utils/approve'
import { pilotCardInfo, BunnyCardsType, citiesName, FleetSizeName } from './const'
import {
  getBunnyCardNFTContract,
  getBunnySpaceshipNFTContract,
  getBunnyVentureContract
} from '@/config/adventure/contractHelpers'
import { getBunnyVentureAddress } from '@/config/adventure/addressHelpers'
import { getBGAddress, getBPAddress, getUSDTAddress } from '@/config/common/addressHelpers'

import BunnyVentureAbi from '@/config/adventure/abi/BunnyVenture.json'

class Adventure {
  /**
   * 查询冒险城市信息
   * @param library
   */
  queryAdventureCities = async (library: Web3Provider) => {
    const contract = getBunnyVentureContract(library)
    const response = await contract.listVentureCity()

    // console.info(response)
    if (!isEmpty(response)) {
      const entranceFeeArr = await this.calcAdventureEntranceFee(undefined, 10)
      // console.info(entranceFeeArr)
      return response.map(({ power, reward, successRate }: Record<string, any>, index: number) => (
        {
          cityId: index,
          power: transferHex(power),
          cityName: citiesName[index],
          ticket: entranceFeeArr[index] ?? 0,
          successRate: transferHex(successRate),
          reward: getFullDisplayBalance(reward._hex)
        }
      ))
    }
    return []
  }

  /**
   * 根据战力匹配城市
   * @param library
   * @param capacity 机队战力（算力）
   */
  matchCitiesByCapacity = async (library: Web3Provider, capacity: number) => {
    const contract = getBunnyVentureContract(library)
    const response = await contract.matchCityIdx(capacity)
    return transferHex(response)
  }

  /**
   * 计算冒险需要支付的门票费USD
   * @param cityId 冒险城市ID
   * @param len
   */
  calcAdventureEntranceFee = async (cityId: number | undefined, len = 0): Promise<Array<Record<string, any>>> => {
    let calls = []
    const address = getBunnyVentureAddress()
    const baseParams = { address, name: 'calcVentureFeeUsdOrBgAmount' }
    if (cityId) {
      calls = [{ ...baseParams, params: [cityId] }]
    } else {
      calls = times(len, (index) => ({ ...baseParams, params: [index] }))
    }
    const response = await multicall(BunnyVentureAbi, calls)
    // console.timeEnd('calcAdventureEntranceFee...')
    if (!isEmpty(response)) {
      return response.map((p: Record<string, any>) => {
        const { bgAmount, usdAmount } = p
        return {
          bgAmount: getFullDisplayBalance(bgAmount._hex ?? 0),
          usdAmount: getFullDisplayBalance(usdAmount._hex ?? 0)
        }
      })
    }
    return []
  }

  /**
   * 计算增加燃料需要支付的USD(天)
   * @param library
   * @param fleetId  机队ID
   * @param days     购买的天数
   * @param payment
   */
  calcIncreaseFuelPaidByDays = async (library: Web3Provider, fleetId: number, days: number, payment: number) => {
    const contract = getBunnyVentureContract(library)
    const response = await contract.calcBuyGasPayAmountByDay(fleetId, days, payment)
    const { payAmount, usdAmount } = response

    return {
      payAmount: getFullDisplayBalance(payAmount._hex),
      usdAmount: getFullDisplayBalance(usdAmount._hex)
    }
  }

  /**
   * 购买燃料(按天)
   * @param library
   * @param account
   * @param fleetId  机队ID
   * @param days     购买的天数
   * @param payment  1=USD+BG 2=USD+BP
   */
  todoBuyFuelByDays = async (library: Web3Provider, account: string, fleetId: number, days: number, payment: number): Promise<boolean> => {
    let status: boolean
    const contract = getBunnyVentureContract(library.getSigner(account))
    const allowanceA = await setCurrencyAllowance(library, account, getBunnyVentureAddress(), getUSDTAddress())
    const allowanceB = await setCurrencyAllowance(library, account, getBunnyVentureAddress(), getBGAddress())
    const allowanceC = await setCurrencyAllowance(library, account, getBunnyVentureAddress(), getBPAddress())
    if (!allowanceA || !allowanceB || !allowanceC) return false

    try {
      const gasLimit = await estimateGas(contract, 'addGasFleetForDay', [fleetId, days, payment])
      const response = await contract.addGasFleetForDay(fleetId, days, payment, { gasLimit })
      const receipt = await response.wait()
      status = receipt.status
    } catch (e) {
      console.error(e)
      status = false
    }

    return status
  }

  /**
   * 查询虚拟账户信息
   * @param library
   * @param account
   */
  queryVirtualAccountInfo = async (library: Web3Provider, account: string): Promise<Record<string, any> | null> => {
    const contract = getBunnyVentureContract(library)
    const response = await contract.getAccount(account)

    if (!isEmpty(response)) {
      const { feeDay, harvestAmount, harvestAmountBG, totalAmount, totalAmountBG } = response
      return {
        feeDay: transferHex(feeDay),
        harvestAmount: getFullDisplayBalance(harvestAmount._hex),
        harvestAmountBG: getFullDisplayBalance(harvestAmountBG._hex),
        totalAmount: getFullDisplayBalance(totalAmount._hex),
        totalAmountBG: getFullDisplayBalance(totalAmountBG._hex)
      }
    }

    return null
  }

  /**
   * 收割收益
   * @param library
   * @param account
   */
  todoHarvest = async (library: Web3Provider, account: string): Promise<boolean> => {
    let status: boolean
    const contract = getBunnyVentureContract(library.getSigner(account))

    try {
      const response = await contract.harvest()
      const receipt = await response.wait()
      status = receipt.status
    } catch (e) {
      console.error(e)
      status = false
    }

    return status
  }

  /**
   * 兔子冒险
   * @param library
   * @param account
   * @param tokenId 驾驶员tokenId 自动驾驶为0
   * @param fleetId 机队id
   * @param cityId  冒险城市id
   * @param payment
   */
  todoAdventure = async (library: Web3Provider, account: string, tokenId: string | number, fleetId: number, cityId: number, payment: number) => {
    const base = { result: false, reward: 0 }
    const contract = getBunnyVentureContract(library.getSigner(account))

    try {
      const allowanceA = await setCurrencyAllowance(library, account, getBunnyVentureAddress(), getUSDTAddress())
      const allowanceB = await setCurrencyAllowance(library, account, getBunnyVentureAddress(), getBGAddress())

      if (!allowanceA || !allowanceB) return base

      const gasLimit = await estimateGas(contract, 'venture', [tokenId, fleetId, cityId, payment])
      const response = await contract.venture(tokenId, fleetId, cityId, payment, { gasLimit })
      // console.info(response)
      const { logs } = await response.wait()
      // console.info(logs)
      if (!isEmpty(logs)) {
        const decode = ethers.utils.defaultAbiCoder.decode(['uint256', 'uint256', 'uint256', 'bool', 'uint256'], logs[logs.length - 1].data)
        // console.info(decode)
        return {
          ...base,
          result: decode[3],
          reward: getFullDisplayBalance(decode[4]._hex)
        }
      }
      return base
    } catch (e) {
      console.info(e)
      return base
    }
  }

  /**
   * 创建机队
   * @param library
   * @param account
   * @param shipId   飞船（卡）id
   * @param tokenIds 机队成员（卡）id
   */
  todoCreateFleet = async (library: Web3Provider, account: string, shipId: string, tokenIds: any[]) => {
    const base = { result: false, fleetId: '' }
    const address = getBunnyVentureAddress()
    const contractA = getBunnyCardNFTContract(library.getSigner(account))
    const contractB = getBunnySpaceshipNFTContract(library.getSigner(account))
    const contractC = getBunnyVentureContract(library.getSigner(account))

    const isApprovedForCard = await setContractApprove(contractA, library, account, address)
    const isApprovedForShip = await setContractApprove(contractB, library, account, address)

    if (!isApprovedForCard || !isApprovedForShip) return base

    try {
      const gasLimit = await estimateGas(contractC, 'createFleet', [shipId, tokenIds])
      const response = await contractC.createFleet(shipId, tokenIds, { gasLimit })
      await sleep(6000) // 确保数据上链时间充足再去获取日志解析数据
      const { logs } = await response.wait(6)
      // console.info(logs)
      if (!isEmpty(logs)) {
        const decode = ethers.utils.defaultAbiCoder.decode(['bool', 'uint256', 'uint256'], logs[logs.length - 1].data)
        return {
          ...base,
          result: decode[0],
          fleetId: transferHex(decode[2])
        }
      }
      return base
    } catch (e) {
      console.info(e)
      return base
    }
  }

  /**
   * 查询单个机队的信息
   * @param library
   * @param fleetId 机队（card）ID
   */
  querySingleFleetInfo = async (library: Web3Provider, fleetId: number) => {
    // console.time('querySingleFleetInfo...')
    try {
      // console.info(fleetId)
      const contract = getBunnyVentureContract(library)
      const response = await contract.getFleetAttrDetail(fleetId)
      // console.timeEnd('querySingleFleetInfo...')
      // console.info(response)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { baseBlock, buff, bunnyPower, cockpit, gas, lastVentureBlock, power, seats, status, tokenId } = response
      const _seat = seats.length
      const _gas = transferHex(gas)
      const _buff = transferHex(buff)
      const _power = transferHex(power)
      const _tokenId = transferHex(tokenId)
      const _bunnyPower = bunnyPower.map((p: BigNumber) => transferHex(p))
      const cards = seats.map((t: BigNumber, index: number) => {
        const _tokenId = transferHex(t)
        const _power = _bunnyPower[index]
        const _type = convertType(_tokenId)
        const kind = convertLevel(_tokenId)
        const level = parseInt(String(_power / 100))
        return ({
          kind,
          level,
          power: _power,
          tokenId: _tokenId,
          type: BunnyCardsType[_type]
        })
      })

      return {
        cards,
        gas: _gas,
        buff: _buff,
        seat: _seat,
        power: _power,
        tokenId: _tokenId
      }
    } catch (e) {
      console.info(e)
    }
  }

  /**
   * 批量查询我的机队
   * @param library
   * @param account
   */
  queryFleetInBulk = async (library: Web3Provider, account: string) => {
    const contract = getBunnyVentureContract(library)
    const response = await contract['listFleet(address,uint256,uint256)'](account, 0, 0)
    let cardBlock = await contract.perDayBlock()
    cardBlock = Number(transferHex(cardBlock))
    if (!isEmpty(response)) {
      return response.map(({
        baseBlock,
        buff,
        bunnyPower,
        cockpit,
        gas,
        lastVentureBlock,
        power,
        seats,
        status,
        tokenId
      }: Record<string, any>) => {
        const _seat = seats.length
        const _gas = transferHex(gas)
        const _buff = transferHex(buff)
        const _power = transferHex(power)
        const _tokenId = transferHex(tokenId)
        const _cockpit = transferHex(cockpit)
        const type = FleetSizeName[_seat].includes('medium-sized') ? 'medium' : FleetSizeName[_seat]
        console.log(transferHex(lastVentureBlock))
        console.log(add(transferHex(lastVentureBlock), cardBlock))
        return {
          type,
          status,
          gas: _gas,
          buff: _buff,
          seat: _seat,
          power: _power,
          cockpit: _cockpit,
          lastBlock: add(transferHex(lastVentureBlock), cardBlock),
          tokenId: _tokenId
        }
      })
    }
    return []
  }

  /**
   * 查询用户的分享卡
   * @param library
   * @param account
   * <=5000 战士
   * > 5000 宇航员
   */
  queryShareCardsInfo = async (library: Web3Provider, account: string) => {
    const contract = getBunnyVentureContract(library.getSigner(account))
    const response = await contract.listShardCard(account)
    const { status, tokenIds } = response

    if (!isEmpty(tokenIds)) {
      return tokenIds.map((tokenId: BigNumber, index: number) => {
        const _tokenId = transferHex(tokenId)
        const _type = _tokenId <= 5000 ? 1 : 2
        return {
          tokenId: _tokenId,
          status: status[index],
          ...pilotCardInfo[`share-${_type}`]
        }
      })
    }
    return []
  }
}

export default new Adventure()
