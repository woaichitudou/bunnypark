import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector
} from '@web3-react/walletconnect-connector'
import { setupNetwork } from '@/utils/wallet'
import { connectorLocalStorageKey, ConnectorNames, connectorsByName } from '@/utils/web3React'

const useAuth = (): any => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector != null) {
      activate(connector, (error: Error) => {
        void (async () => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup: boolean = await setupNetwork()
            if (hasSetup) {
              await activate(connector)
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              // need a toast TODO
              console.error('No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                connector.walletConnectProvider = null
              }
              console.error('Please authorize to access your account')
            } else {
              console.error(error.name, error.message)
            }
          }
        })()
      }).catch(() => {})
    } else {
      console.error("Can't find connector", 'The connector config is wrong')
    }
  }, [activate])

  const logout = useCallback(() => {
    deactivate()

    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
    window.localStorage.removeItem(connectorLocalStorageKey)
  }, [deactivate])

  return { login, logout }
}

export default useAuth
