import React, { FC, useState, useEffect, useCallback } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Store from '@/class/Shop'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

import { Swiper, SwiperSlide } from 'swiper/react'
import C from '@/components'
import BunnyCard from '../components/Card/BunnyCard'
import 'swiper/swiper.scss'

const BuySucceed: FC = () => {
  const { account, library } = useActiveWeb3React()
  const { params } = useRouteMatch()
  const history = useHistory()
  const multiply = (params as any)?.multiply
  const { getBlindBoxDetail } = Store

  const [total, setTotal] = useState(0)
  const [cardList, setCardList] = useState([])

  const getData = useCallback(async (account: string, library: any) => {
    const boxId = (params as any)?.boxId
    const res = await getBlindBoxDetail(account, library, boxId)
    setCardList(res)
    setTotal(res.length)
  }, [getBlindBoxDetail, params])

  useEffect(() => {
    if (account) void getData(account, library).then()
  }, [getData, account, library])

  const handleGo = () => {
    history.push('/spaceship')
  }
  return (
    <div className='web-rabbit-suc'>
      {/* <C.BackButton onClick={() => history.replace('/m/bunny')} /> */}
      <div className='title'>Congratulations！</div>
      <p className='desc'>on you getting Adventure cards {multiply ? 'and Babybunny' : ''}.</p>
      <p className='desc total'>Total：{total} {total > 1 ? 'Cards' : 'Card'}</p>
      <Swiper className="web-rabbit-suc-swiper">
        {
          cardList.map((item: any, index: any) => {
            return (
              <SwiperSlide key={index}>
                <BunnyCard size='small' kind={item.kind} tokenId={item.tokenId} level={item.levelPower} rank={item.types} rear={Boolean(false)}/>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      <div className='web-rabbit-suc-btn' onClick={handleGo}>
        <span>Build a Fleet</span>
        <C.WebImage src="rabbit/icon-go.png" />
      </div>
    </div>
  )
}

export default BuySucceed
