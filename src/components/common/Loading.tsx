import React, { FC } from 'react'
import classNames from 'classnames'
interface Props {
  dark?: boolean
  show: boolean
  section?: boolean
  web?: boolean // pc端传进来Web
}

const Components: FC<Props> = ({ show = false, dark = false, section = false, web = false }) => {
  if (!show) return null
  return (
    <div className={classNames('m-common-loading', { dark, section, web })}>
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

export default Components

export const auto = {
  name: 'MLoading',
  Components
}
