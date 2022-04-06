import React, { FC } from 'react'
import C from '@/components'
import Modal from './modal'

interface Props {
  show: boolean
  onClose?: () => void
  tip?: string
}
const Components: FC<Props> = ({ show, tip = 'Waiting for wallet confirmation' }) => {
  return (
    <Modal show={show}>
      <div className="img-status">
        <C.WebImage src='modal/modal-load.png' className='load'/>
        <span className='img-status-text'>Loading...</span>
      </div>
      <div className='text'>{tip}</div>
    </Modal>
  )
}

export default Components

export const auto = {
  name: 'McpStatusWaitModal',
  Components
}
