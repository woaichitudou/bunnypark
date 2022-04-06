import { useEffect, useState } from 'react'

import useRefresh from '@/hooks/useRefresh'
import { simpleRpcProvider } from '@/utils/providers'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import { getFullDisplayBalance } from '@/utils/formatBalance'
import { getBep20Contract } from '@/config/common/contractHelpers'

const useTokenBalance = (tokenAddress: string): any => {
  const { fastRefresh } = useRefresh()
  const { library, account } = useActiveWeb3React()

  const [balance, setBalance] = useState<string>('0')

  useEffect(() => {
    const fetchBalance = async (): Promise<any> => {
      const contract = getBep20Contract(tokenAddress, library)
      const walletBalance = await contract.balanceOf(account)
      const transferWalletBalance = getFullDisplayBalance(walletBalance?._hex)
      setBalance(transferWalletBalance)
    }

    if (account != null) {
      void fetchBalance()
    }
  }, [account, tokenAddress, library, fastRefresh])

  return balance
}

export const useTokenBalanceForBNB = (): any => {
  const [balance, setBalance] = useState<string>('0')
  const { account } = useActiveWeb3React()

  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        const walletBalance = await simpleRpcProvider.getBalance(account)
        const transferWalletBalance = getFullDisplayBalance(walletBalance?._hex as any)
        setBalance(transferWalletBalance)
      }
    }

    void fetchBalance()
  }, [account])

  return balance
}

export default useTokenBalance
