import React, { FC } from 'react'
import C from '@/components'

interface Porps {
  show?: boolean
  onClose?: () => void
  onClick?: () => void
}

export const Components: FC<Porps> = ({ show = false, onClose, onClick }) => {
  return (
    <C.WebModal show={show} onClose={onClose} size="large">
      <div className="web-insufficient-modal">
        <p className="title">Power is not enough</p>
        <p className="tatol">The power is not enough to Adventure, please add again.</p>
        <C.WebButton type='blue' onClick={onClick}>OK</C.WebButton>
      </div>
    </C.WebModal>
  )
}

export default Components
export const auto = {
  name: 'WebInsufficientModal',
  Components
}
