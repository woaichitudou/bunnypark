import React, { FC } from 'react'
import C from '@/components'
import Modal from './modal'
interface Props {
  show: boolean
  onClose: () => void
  tip?: string
}
const Components: FC<Props> = ({ show, onClose, tip = 'Transaction failed' }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="img-status">
        <C.WebImage src='modal/modal-fail.png' />
      </div>
      <div className='text'>{tip}</div>
    </Modal>
  )
}

export default Components

export const auto = {
  name: 'McpStatusFailModal',
  Components
}
