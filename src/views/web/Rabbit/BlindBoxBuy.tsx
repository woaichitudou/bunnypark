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
    history.push(`/bunny/buy/preview/${quantity}/${price}`)
  }
  return (
    <div className='web-rabbit-buy'>
      {/* <C.BackButton backUrl='/bunny' /> */}
      <C.WebTitle title='BlindBox'/>
      <ul className='web-rabbit-buy-cont'>
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
          <C.WebStepper min={1} max={10} value={quantity} onChange={(val: number) => setQuantity(val)}/>
        </li>
      </ul>
      <div className='web-rabbit-buy-btn'><C.WebButton onClick={handleBuy}>Buy Now</C.WebButton></div>
    </div>
  )
}

export default BlindBoxBuy
