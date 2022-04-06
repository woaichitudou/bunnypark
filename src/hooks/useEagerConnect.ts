import { useEffect } from 'react'

import useAuth from '@/hooks/useAuth'
import { connectorLocalStorageKey, ConnectorNames } from '@/utils/web3React'

const _binanceChainListener = async () =>
  await new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get () {
        return this.bsc
      },
      set (bsc) {
        this.bsc = bsc

        resolve()
      }
    })
  )

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    if (connectorId) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
      const isBinanceChainDefined = 'BinanceChain' in window
      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        void _binanceChainListener().then(() => login(connectorId))
        return
      }

      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect
