import React, { FC } from 'react'
import C from '@/components'

interface Porps {
  show?: boolean
  disabled?: boolean
  onClose?: () => void
  onClick?: () => void
  usdtAmount: number
  usdtBalance: string
  balance: number
  currencyAmount: number
  currencySymbol: string
  currencyBalance: number
}

export const Components: FC<Porps> = (
  {
    show = false,
    onClose,
    onClick,
    usdtAmount = 0,
    usdtBalance = 0,
    currencyAmount = 0,
    currencySymbol = '',
    currencyBalance = 0
  }) => {
  return (
    <C.WebModal show={show} onClose={onClose} size="large" title='Upgrade Combat Power'>
      <div className="web-confirm-pay">
        <C.WebImage src='new/icon-1.png' />
        <div className="web-confirm-pay-price">
          <p><em>{usdtAmount}</em><span> USDT</span></p>
          <p><em>{currencyAmount}</em><span> {currencySymbol}</span></p>
        </div>
        <div className="web-confirm-pay-total">
          <p><label>Wallet Balance:</label><span><em>{usdtBalance}</em>USDT</span></p>
          <p><label>Wallet Balance:</label><span><em>{currencyBalance}</em>{currencySymbol}</span></p>
        </div>
        <C.WebButton type='blue' disabled={usdtAmount > usdtBalance || currencyAmount > currencyBalance} onClick={onClick}>Confirm</C.WebButton>
      </div>
    </C.WebModal>
  )
}

export default Components
export const auto = {
  name: 'WebUpgradePayModal',
  Components
}
