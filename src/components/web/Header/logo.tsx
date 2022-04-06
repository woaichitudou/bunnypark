import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import C from '@/components'

const HeaderLogo: FC<any> = ({ white = false }) => {
  return (
    <h1 className="web-header-logo">
      <Link to="/">
        <C.WebImage src={white ? '../../mobile/common/logo-white.png' : '../../mobile/common/logo.png'} />
      </Link>
    </h1>
  )
}

export default HeaderLogo
