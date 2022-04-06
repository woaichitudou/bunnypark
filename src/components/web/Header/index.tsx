import React, { FC, useEffect, useState } from 'react'
import throttle from 'lodash/throttle'
import C from '@/components'

import Logo from './logo'
import Nav from './navMenu'

const Components: FC<any> = ({ home = false }) => {
  const [fixedHeader, setFixedHeader] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setFixedHeader(window.pageYOffset > (home ? 700 : 75))
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [home])

  return (
    <>
      <header
        className={`web-header${fixedHeader ? ' web-header-fixed' : ''}${
          home && !fixedHeader ? ' web-header-home' : ''
        }`}
      >
        <div className="web-header-inner">
          <div className="web-header-left">
            <Logo />
            <Nav />
          </div>
          <div className="web-header-right">
            <C.WebWalletConnectButton />
          </div>
        </div>
      </header>
      <div className="web-header-bg" />
      {home ? null : <div className="web-header-placeholder" />}
    </>
  )
}

export default Components

export const auto = {
  name: 'WebHeader',
  Components: Components
}
