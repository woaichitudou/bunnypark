import React, { FC, useMemo } from 'react'
import useTokenBalance from '@/hooks/useTokenBalance'
import { securityInterception } from '@/utils/formatBalance'
import { getBGAddress, getUSDTAddress } from '@/config/common/addressHelpers'

import C from '@/components'

interface Props {
  priceObj: Record<string, number>
  quantity: number
  show: boolean
  onClose?: () => void
  onClick?: () => void
}
const SureCombine: FC<Props> = ({ priceObj, quantity, show = false, onClick, onClose }) => {
  const { usdAmount, bgAmount } = (priceObj as any)
  const balance = securityInterception(useTokenBalance(getBGAddress()), 3)
  const Usdtbalance = securityInterception(useTokenBalance(getUSDTAddress()), 3)
  const bgTotal = bgAmount * quantity
  const usdtTotal = usdAmount * quantity
  const canBuy = useMemo(() => {
    return balance > bgTotal && Usdtbalance > usdtTotal
  }, [bgTotal, balance, Usdtbalance, usdtTotal])
  return <C.WebModal show={show} onClose={onClose} title='Improve combat power' size='special' className='m-rabbit-sure-upgrade'>
    <p>Up {quantity} level{quantity > 1 ? <span>s</span> : null} with <span>{bgTotal}</span> BG and <span>{usdtTotal}</span> USDT</p>
    <div className='balance'>
      <div>Wallet Balance:<span> {Usdtbalance}</span>USDT</div>
      <div>Wallet Balance:<span>{balance}</span>BG</div>
    </div>
    <div className="m-upgrade-modal-btn"><C.Button type='blue' onClick={onClick} disabled={!canBuy}>Upgrade</C.Button></div>
  </C.WebModal>
}

export default SureCombine
