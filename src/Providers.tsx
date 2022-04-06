import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'

import store from '@/state'
import { getLibrary } from '@/utils/web3React'
import { RefreshContextProvider } from '@/contexts/RefreshContext'

const Providers: FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={ getLibrary }>
      <Provider store={store}>
        <RefreshContextProvider>
          { children }
        </RefreshContextProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
