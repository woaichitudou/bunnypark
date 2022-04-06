import React, { FC } from 'react'
import C from '@/components'
import Modal from './modal'

interface Props {
  show: boolean
  onClose: () => void
  tip?: string
}
const Components: FC<Props> = ({ show, onClose, tip = 'Successful' }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="img-status">
        <C.WebImage src='modal/modal-suc.png'/>
      </div>
      <div className='text'>{tip}</div>
    </Modal>
  )
}

export default Components

export const auto = {
  name: 'McpStatusSuccModal',
  Components
}
