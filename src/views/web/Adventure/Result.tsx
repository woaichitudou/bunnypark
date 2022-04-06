import { createPortal } from 'react-dom'
import { TouchScrollable } from 'react-scrolllock'
import React, { FC, useEffect, useState } from 'react'

import C from '@/components'
import { securityInterception } from '@/utils/formatBalance'

interface Props {
  show: boolean // 必传 显示隐藏
  onClose?: () => void
  callback?: () => void
  succeed: boolean // 必传 显示成功或者失败
  bg?: string | number // 成功时需传
  cityName?: string
}

const Result: FC<Props> = ({ onClose, callback, show = false, succeed = false, bg = 0, cityName }) => {
  const [innerVisible, setInnerVisible] = useState<boolean>(false)
  useEffect(() => {
    setInnerVisible(show)
  }, [show])
  const handleClick = (): void => {
    setInnerVisible(false)
    onClose?.()
  }
  const handleGoBackEv = () => {
    handleClick()
    callback?.()
  }
  return createPortal(
    <>{
      innerVisible && <TouchScrollable>
        <div className='web-result'>
          <div className="web-result-box" onClick={handleClick} />
          {succeed ? <div className="web-result-succeed">
            <h2>Success</h2>
            <C.WebImage src='adventure/success.png' />
            <p>Congratulations on your successful adventure to {cityName}  You will get <em>{securityInterception(bg as any, 3)} </em>USDT (in $BG). </p>
            <p>Your rewards have been displayed in the ADVENTURE tab.</p>
            <C.WebButton onClick={handleGoBackEv}>Check</C.WebButton>
          </div> : <div className="web-result-fail">
            <h2>Failed</h2>
            <C.WebImage src='adventure/fail.png' />
            <p>Your adventure to {cityName}  has failed. You will not get any rewards.</p>
            <div className="web-result-fail-btn-fail" onClick={handleGoBackEv}>Confirm</div>
          </div>}
        </div>
      </TouchScrollable>
    }
    </>, document.body)
}

export default Result
