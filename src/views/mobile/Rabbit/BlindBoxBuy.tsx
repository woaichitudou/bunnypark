import React, { FC, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Store from '@/class/Shop'

import C from '@/components'

const BlindBoxBuy: FC = () => {
  const { fetchBlindBoxPrice } = Store
  const history = useHistory()
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState<number>(0)

  const getBlindBoxPrice = useCallback(async () => {
    const res = await fetchBlindBoxPrice(1)
    setPrice(res)
  }, [fetchBlindBoxPrice])

  // 获取价格
  useEffect(() => {
    void getBlindBoxPrice()
  }, [getBlindBoxPrice])

  const handleBuy = () => {
    history.push(`/m/bunny/buy/preview/${quantity}/${price}`)
  }
  return (
    <div className='m-rabbit-buy'>
      <C.BackButton backUrl='/m/bunny' />
      <C.Title title='BlindBox'/>
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
          <label>Quantity</label>
          <C.Stepper min={1} max={10} value={quantity} onChange={(val: number) => setQuantity(val)}/>
        </li>
      </ul>
      <div className='m-rabbit-buy-btn'><C.Button onClick={handleBuy}>Buy Now</C.Button></div>
    </div>
  )
}

export default BlindBoxBuy
