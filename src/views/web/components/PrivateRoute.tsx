import React, { FC, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Route, RouteProps, useLocation } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

import C from '@/components'

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { account } = useWeb3React()
  const { login } = useAuth()
  const [showConnectModal, setShowConnectModal] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!account) setShowConnectModal(true)
  }, [account, location])

  return (
    <Route
      { ...rest }
      render={ () =>
        account
          ? (children)
          : (<C.WalletConnectModal show={showConnectModal} login={login} onClose={() => setShowConnectModal(false)} />)
      }
    />
  )
}

export default PrivateRoute
