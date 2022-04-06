import BigNumber from 'bignumber.js'
import { get, isEmpty, isArray } from 'lodash'

// 通过日志获取id信息
export const getBoxIdFromLogs = (logs: any[]) => {
  if (isArray(logs) && !isEmpty(logs)) {
    const length = logs.length
    const targetId = logs[length - 1].topics[2]
    return new BigNumber(targetId).toNumber()
  }
  return null
}

// _hex转换
export const transferHex = (o: BigNumber) => new BigNumber(get(o, '_hex')).toNumber()

export const convertLevel = (id: any) => id & 0xff

export const convertType = (id: any) => (id & 0x0fff) >> 8
