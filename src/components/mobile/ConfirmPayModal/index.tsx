import React, { FC } from 'react'
import C from '@/components'

interface Porps {
  show?: boolean
  disabled?: boolean
  onClose?: () => void
  onClick?: () => void
  currencySymbol: string
  currencyBalance: number[]
  price: Record<string, number>
}

export const Components: FC<Porps> = (
  {
    show = false,
    disabled = false,
    onClose,
    onClick,
    price,
    currencyBalance,
    currencySymbol = ''
  }) => {
  return (
    <C.WebModal show={show} onClose={onClose} size="large">
      <div className="m-confirm-pay">
        <div className="m-confirm-pay-title">Fuel Contract</div>
        <C.WebImage src='fleet/refuel.png' />
        <div className="m-confirm-pay-price">
          <p><em>{price?.usdAmount ?? 0}</em><span> USDT</span></p>
          <p><em>{price?.payAmount ?? 0}</em><span> {currencySymbol}</span></p>
        </div>
        <div className="m-confirm-pay-total">
          <p><label>Wallet Balance:</label><span><em>{currencyBalance[0] ?? 0}</em>USDT</span></p>
          <p><label>Wallet Balance:</label><span><em>{currencyBalance[1] ?? 0}</em>{currencySymbol}</span></p>
        </div>
        <C.Button type='blue' disabled={disabled} onClick={onClick}>Confirm</C.Button>
      </div>
    </C.WebModal>
  )
}

export default Components
export const auto = {
  name: 'ConfirmPayModal',
  Components
}
