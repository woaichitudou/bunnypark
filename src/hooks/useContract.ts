import { useMemo } from 'react'

import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import { getContract } from '@/config/common/signerContract'

// 在tsx文件中直接使用的合约，里面有hooks
// export function useBuntyContract (tokenAddress?: string, withSignerIfPossible?: boolean): any {
//   return useContract(getBountyAbiAddress(), Bounty, withSignerIfPossible)
// }

export const useContract = (address: string | undefined, ABI: any, withSignerIfPossible = true): any => {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}
