import React, { FC, useMemo, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import useTokenBalance from '@/hooks/useTokenBalance'
import { securityInterception } from '@/utils/formatBalance'
import { getBPAddress } from '@/config/common/addressHelpers'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import Store from '@/class/Shop'

import C from '@/components'

const BlindBoxBuy: FC = () => {
  const { params } = useRouteMatch()
  const { account, library } = useActiveWeb3React()
  const history = useHistory()
  const [status, setStatus] = useState('')
  const { buyBlindBox } = Store

  const tokenId = (params as any)?.tokenId // 有tokenId则为繁衍购买
  const quantity = (params as any)?.quantity
  const price = (params as any)?.price

  const balance = securityInterception(useTokenBalance(getBPAddress()), 3)

  const handleBuy = async () => {
    await setStatus('Waiting')
    try {
      const inviteId = tokenId ?? 0
      const boxId = await buyBlindBox(account as string, library as any, inviteId, quantity)
      await setStatus('')
      const param = tokenId ? 'multiply' : ''
      history.push(`/m/bunny/buy/succeed/${boxId}/${param}`)
    } catch (e) {
      setStatus('Failure')
    }
  }

  const handleClose = () => {
    setStatus('')
  }

  const canBuy = useMemo(() => {
    return balance >= quantity * price
  }, [quantity, price, balance])
  return (
    <div className='m-rabbit-buy'>
      <C.BackButton />
      <C.Title title='You Will Be Getting' />
      <p className='desc'>Adventure series Bunny BlindBox {tokenId ? 'and BabyBunny' : ''}</p>
      <p className='desc total'>Total: {quantity}{quantity > 1 ? 'Cards' : 'Card'}</p>
      <ul className='m-rabbit-buy-cont'>
        <li>
          <label>Series</label>
          <span>Adventure</span>
        </li>
        <li>
          <label>Price</label>
          <div className='price'><i>{price}</i><span>BP</span></div>
        </li>
        <li>
          <label>Total</label>
          <div className='price'><i>{securityInterception(quantity * price, 3)}</i><span>BP</span></div>
        </li>
      </ul>
      <div className='m-rabbit-buy-balance'>Wallet Balance:  <span>{balance} bp</span></div>
      <div className='m-rabbit-buy-btn'><C.Button onClick={handleBuy} disabled={!canBuy}>Pay Now</C.Button></div>
      <C.McpStatusWaitModal show={status === 'Waiting'} onClose={handleClose} />
      <C.McpStatusSuccModal show={status === 'Success'} onClose={handleClose} />
      <C.McpStatusFailModal show={status === 'Failure'} onClose={handleClose} />
    </div>
  )
}

export default BlindBoxBuy
