import { ethers } from 'ethers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import getNodeUrl from '@/utils/getRpcUrl'

interface IRPCMap {
  [chainId: number]: string
}

export const connectorLocalStorageKey = 'connectorId'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  BSC = 'bsc',
}

const POLLING_INTERVAL = 12000

const rpcUrl = getNodeUrl()

const chainId: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '56')

export const injected = new InjectedConnector({
  supportedChainIds: [chainId]
})

export const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl } as IRPCMap,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})

export const bscConnector = new BscConnector({ supportedChainIds: [56] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector
}

export const getLibrary = (provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}
