import React, { FC } from 'react'
import classnames from 'classnames'
interface Porps {
  title: string //  标题内容
  type?: string
}

export const Components: FC<Porps> = ({ title, type }) => {
  return (
    <div className={classnames('web-title', { [`web-title-${type}`]: type })}> <em>{title}</em></div >
  )
}

export default Components
export const auto = {
  name: 'WebTitle',
  Components
}
