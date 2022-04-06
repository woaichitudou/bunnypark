// 钱包连接弹框
import React, { FC } from 'react'
import C from '@/components'
import { connectorLocalStorageKey, ConnectorNames } from '@/utils/web3React'
import classnames from 'classnames'
import { sleep } from '@/utils/tools'
import { STATIC } from '@/config'

const connectorsData = [
  {
    title: 'Metamask',
    icon: 'icon-wallet-mm.svg',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'TokenPocket',
    icon: 'icon-wallet-tp.svg',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'TrustWallet',
    icon: 'icon-wallet-tw.svg',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'WalletConnect',
    icon: 'icon-wallet-wc.svg',
    connectorId: ConnectorNames.WalletConnect
  },
  {
    title: 'MathWallet',
    icon: 'icon-wallet-mw.svg',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'Binance Chain Wallet',
    icon: 'icon-wallet-bc.svg',
    connectorId: ConnectorNames.BSC
  }
]

const Components: FC<any> = ({ show, login, onClose, className, mobile = true }) => {
  const onClickFunc = async (entry: any) => {
    login(entry.connectorId)
    window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId)
    // window.location.reload()
    await sleep(500)
    onClose()
  }
  return (
    <C.WebModal title="Connect to a wallet" show={show} onClose={onClose} size='large'>
      <div className={classnames('m-connect-modal', { 'm-connect-modal-mobile': mobile })}>
        {connectorsData.map((entry, index) => (
          <div className={classnames('m-connect-modal-item')} key={entry.title} onClick={() => onClickFunc(entry)}>
            <img alt="" className="m-connect-modal-item-img" src={`${STATIC}icons/${entry.icon}`} />
            <div className='m-connect-modal-item-title'>{entry.title}</div>
          </div>
        ))}
      </div>
    </C.WebModal>
  )
}

export default Components

export const auto = {
  name: 'WebWalletConnectModal',
  Components
}
