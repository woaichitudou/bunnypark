import React, { FC, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
interface Props {
  backUrl?: string // 可指定返回地址
  onClick?: (e: any) => void // 也可在点击时，执行函数方法
}
const Components: FC<Props> = ({ backUrl, onClick }) => {
  const history = useHistory()

  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const clickAction = (e: any) => {
    if (backUrl) {
      history.push(backUrl)
    } else if (onClick) {
      onClick?.(e)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 50)
    } else {
      history.goBack()
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 50)
    }
  }

  return (
    <button className='m-back-button' onClick={clickAction} type='button'>BACK</button>
  )
}

export default Components
export const auto = {
  name: 'BackButton',
  Components
}
