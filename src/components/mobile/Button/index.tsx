import React, { FC } from 'react'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'

interface Porps {
  type?: string //  默认 yellow 蓝色按钮 为 blue
  size?: string // 默认 default 按钮 为small
  disabled?: boolean
  onClick?: (e: any) => void
  to?: string
}

export const Components: FC<Porps> = ({ children, type = 'yellow', size = 'default', disabled = false, onClick, to }) => {
  const history = useHistory()
  const handleClick = (e: any): void => {
    if (!disabled) {
      if (to) {
        history.push(to)
      } else {
        onClick?.(e)
      }
    }
  }
  const setClassName = classnames('m-button', { [`m-button-type-${type}`]: type }, { [`m-button-size-${size}`]: size }, { 'm-button-disabled': disabled })
  return (
    <div className={setClassName}><button
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button></div>

  )
}

export default Components
export const auto = {
  name: 'Button',
  Components
}
