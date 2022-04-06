import React, { FC, useState, useEffect, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import Store from '@/class/Shop'
import Toast from '@/utils/Toast'

import C from '@/components'

const BlindBoxBuy: FC = () => {
  const { fetchBlindBoxPrice, fetchCardsInfo, fetchCheckInviteTokenId } = Store
  const { account } = useActiveWeb3React()
  const history = useHistory()
  const [quantity, setQuantity] = useState(1)
  const [inviteTokenId, setInviteTokenId] = useState('')
  const [cardList, setCardList] = useState([])
  const [price, setPrice] = useState<number>(0)
  const getBlindBoxPrice = useCallback(async () => {
    const res = await fetchBlindBoxPrice(1)
    setPrice(res)
  }, [fetchBlindBoxPrice])

  const getCards = useCallback(
    async (acc: string) => {
      const res = await fetchCardsInfo(acc) ?? []
      setCardList(res)
    },
    [fetchCardsInfo]
  )

  useEffect(() => {
    if (account) void getCards(account)
  }, [account, getCards])

  // 获取价格
  useEffect(() => {
    void getBlindBoxPrice()
  }, [getBlindBoxPrice])

  const handleBuy = async () => {
    const res = await fetchCheckInviteTokenId(inviteTokenId)
    if (!res) {
      // 这里显示提示框
      Toast.fail('Token ID error')
      return
    }
    history.push(`/m/bunny/buy/preview/${quantity}/${price}/${inviteTokenId}`)
  }

  const handleInput = (event: any) => setInviteTokenId(event.target.value)

  const isCanBuy = useMemo(() => {
    // eslint-disable-next-line no-restricted-globals
    return inviteTokenId && Number(inviteTokenId) > 0 && cardList.findIndex((item: any) => item.tokenId === inviteTokenId) === -1
  }, [inviteTokenId, cardList])

  return (
    <div className='m-rabbit-buy'>
      <C.BackButton />
      <C.Title title='Bunny Breeding'/>
      <p className='desc'>
      Please enter the TOKEN ID of an Adventure Bunny and pay for the breeding fee. The BabyBunny that you will be getting will increase the success rate of your adventures.
      </p>
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
          <C.Stepper min={1} max={5} value={quantity} onChange={(val: number) => setQuantity(val)}/>
        </li>
      </ul>
      <div className='m-rabbit-buy-input'><input value={inviteTokenId} onChange={handleInput} type="text" placeholder='Please enter the TOKEN ID of an adult bunny'/></div>
      <div className='m-rabbit-buy-btn'><C.Button disabled={!isCanBuy} onClick={handleBuy}>Buy Now</C.Button></div>
    </div>
  )
}

export default BlindBoxBuy
