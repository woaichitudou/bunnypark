import classnames from 'classnames'
import { createPortal } from 'react-dom'
import { TouchScrollable } from 'react-scrolllock'
import React, { FC, useEffect, useState } from 'react'
import { isMobile } from '@/utils/tools'

import { STATIC } from '@/config'

interface Props {
  show: boolean
  size?: string // small large
  closeOnOverlayClick?: boolean
  title?: string
  className?: string
  onClose?: () => void
  children?: React.ReactElement | React.ReactElement[]
}

const WebModal: FC<Props> = ({ closeOnOverlayClick = true, show = false, size = 'small', onClose, children, title = '', className }) => {
  const mobile = isMobile()
  const [innerVisible, setInnerVisible] = useState<boolean>(false)
  useEffect(() => {
    setInnerVisible(show)
  }, [show])
  const handleClick = (): void => {
    setInnerVisible(false)
    onClose?.()
  }
  const handleOverlayDismiss = (): void => {
    if (closeOnOverlayClick) {
      onClose?.()
    }
  }
  return createPortal(
    <>
      {
        innerVisible && <TouchScrollable>
          <div className={classnames('web-modal', { 'web-modal-mobile': mobile }, className)}>
            <div className='web-modal-mask' onClick={handleOverlayDismiss} aria-hidden="true"/>
            <div className={classnames('web-modal-cont', `web-modal-cont-${size}`)}>
              <img alt="" className="web-modal-cont-close" src={`${STATIC}modal/close.png`} onClick={handleClick} />
              {
                title && <div className='web-modal-cont-title'>{title}</div>
              }
              {children}
            </div>
          </div>
        </TouchScrollable>
      }
    </>, document.body)
}

export default WebModal

export const auto = {
  name: 'WebModal',
  Components: WebModal
}
