import React, { FC } from 'react'
import classnames from 'classnames'
import { isMobile } from '@/utils/tools'

import C from '@/components'
interface Props {
  show: boolean
  onClose?: () => void
  children?: React.ReactElement | React.ReactElement[]
}

const Components: FC<Props> = ({ show, onClose, children }) => {
  const mobile = isMobile()
  return <C.WebModal show={show} onClose={onClose}>
    <div className={classnames('m-modal-status', { web: !mobile })}>
      {children}
      {
        mobile ? <C.Button type='blue' onClick={onClose}>SHUT DOWN</C.Button> : <C.WebButton type='blue' onClick={onClose}>SHUT DOWN</C.WebButton>
      }
    </div>
  </C.WebModal>
}

export default Components

export const auto = {
  name: 'McpStatusModal',
  Components
}
