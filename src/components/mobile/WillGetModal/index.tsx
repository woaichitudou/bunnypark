import React, { FC } from 'react'
import C from '@/components'
import { securityInterception } from '@/utils/formatBalance'

interface Porps {
  show?: boolean
  onClose?: () => void
  onClick?: () => void
  dollar: string | number// 美元必传参数
  bg: string | number// BG 必传参数
  serviceFee: string | number// 服务费 必传参数
  usdt: string | number// 全部USDT 必传参数
}

export const Components: FC<Porps> = ({ show = false, onClose, onClick, dollar, bg, serviceFee, usdt }) => {
  return (
    <C.WebModal show={show} onClose={onClose} size="large">
      <div className="m-will-get-modal">
        <div className="m-will-get-modal-title">You will get</div>
        <div className="m-will-get-modal-icon">
          <C.WebImage src='adventure/avar.png' />
          <div className="m-will-get-modal-icon-right">
            <span>{securityInterception(bg as any, 6)} BG</span>
            <small>≈${dollar}</small>
          </div>
        </div>
        <div className="m-will-get-modal-sever">Withdrawal Fees：<span>{securityInterception(serviceFee as any, 3)}</span>%</div>
        <div className="m-will-get-modal-total">
          Wallet Balance:
          <span>{securityInterception(usdt as any, 6)} BG</span>
        </div>
        <C.Button type='blue' onClick={onClick}>Confirm</C.Button>
      </div>
    </C.WebModal>
  )
}

export default Components
export const auto = {
  name: 'WillGetModal',
  Components
}
