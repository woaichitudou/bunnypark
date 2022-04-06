import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { TouchScrollable } from 'react-scrolllock'
import { useWeb3React } from '@web3-react/core'

import useAuth from '@/hooks/useAuth'
import C from '@/components'
import Nav from './Nav'
import Account from './Account'

const Components: FC = () => {
  const { account } = useWeb3React()
  const { login } = useAuth()
  const [menuShow, setMenuShow] = useState(false)
  const [showConnectModal, setShowConnectModal] = useState(false)

  return (
    <>
      <div className="m-header">
        <a className="m-header-logo" href="https://www.bunnypark.com/m">
          <C.WebImage src="../../mobile/main/logo.svg" />
        </a>
        {account != null ? (
          <div
            className={classNames('m-header-menu-switch', { active: menuShow })}
            onClick={() => setMenuShow(!menuShow)}
          >
            <div className="m-header-dot" />
          </div>
        ) : (
          <div className="m-header-button" onClick={() => setShowConnectModal(true)}>
            Connect
          </div>
        )}
      </div>
      <div className="m-header-space" />
      <TouchScrollable>
        <div className={classNames('m-header-menu', { active: menuShow })}>
          <Account onDismiss={() => setMenuShow(false)} />
          <Nav onDismiss={() => setMenuShow(false)} />
          {/* <Lang /> */}
        </div>
      </TouchScrollable>
      <C.WalletConnectModal show={showConnectModal} login={login} onClose={() => setShowConnectModal(false)} />
    </>
  )
}

export default Components

export const auto = {
  name: 'MHeader',
  Components: Components
}
