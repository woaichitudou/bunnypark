import { ethers } from 'ethers'

import { MultiCallResponse } from '@/config/types'
import { getMulticallContract } from '@/config/common/contractHelpers'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface MulticallOptions {
  requireSuccess?: boolean
}

export const multicall = async <T = any>(
  abi: any[],
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true }
): Promise<MultiCallResponse<T>> => {
  const { requireSuccess } = options
  const multi = getMulticallContract()
  const itf = new ethers.utils.Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const returnData = await multi.tryAggregate(requireSuccess, calldata)
  return (returnData.map((call: [any, any], i: any) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  }))
}

export default multicall
