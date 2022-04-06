import React, { FC, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import C from '@/components'
import useAuth from '@/hooks/useAuth'

const Components: FC<any> = ({ className }) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const accountEllipsis = account != null ? `${String(account).substring(0, 5)}...${String(account).substring(account.length - 4)}` : ''
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  return (
    <>
      {account != null ? (
        <div
          className='web-wallet-connect-button'
          onClick={() => {
            setShowAccountModal(true)
          }}
        >
          {accountEllipsis}
        </div>
      ) : (
        <div
          className='web-wallet-connect-button'
          onClick={() => {
            setShowConnectModal(true)
          }}
        >
          CONNECT WALLET
        </div>
      )}
      <C.WebWalletConnectModal show={showConnectModal} login={login} onClose={() => setShowConnectModal(false)} />
      <C.WebWalletAccountModal show={showAccountModal} logout={logout} onClose={() => setShowAccountModal(false)} account={account} />
    </>
  )
}

export default Components

export const auto = {
  name: 'WebWalletConnectButton',
  Components
}
