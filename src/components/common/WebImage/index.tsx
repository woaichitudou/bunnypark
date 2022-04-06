import React, { FC } from 'react'
import classNames from 'classnames'
import { STATIC } from '@/config'

interface Props {
  className?: string
  src?: string
  onClick?: (e: any) => void
}

const Components: FC<Props> = ({ className = '', src = '', onClick }) => {
  if (!src) return null
  const clickFunc = (e: any) => onClick?.(e)
  return (
    <img className={classNames(className)} src={`${STATIC}${src}`} onClick={clickFunc} />
  )
}

export default Components

export const auto = {
  name: 'WebImage',
  Components
}
