import React, { FC, useState, useMemo, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import Store from '@/class/Shop'
import { clearShareMessage } from '@/state/share'
import { useShareMessage } from '@/state/share/hooks'
import { useAppDispatch } from '@/state'
import Toast from '@/utils/Toast'

import C from '@/components'
import BunnyCard from '../components/Card/BunnyCard'
import BunnySendCard from './components/BunnySendCard'

const Rabbit: FC = () => {
  const { account } = useActiveWeb3React()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { shareMessage } = useShareMessage()
  const { fetchCardsInfo, getSMALLCard, getOtherCard } = Store

  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [bunnyCardList, setBunnyCardList] = useState([])
  const [cardList, setCardList] = useState([])
  const [cardInfo, setCardInfo] = useState({})
  const [active, setActive] = useState('Bunnies')
  const getList = useCallback((arr: Array<Record<string, any>>) => {
    const fnc = active === 'Bunnies' ? getOtherCard : getSMALLCard
    const setList = active === 'Bunnies' ? setBunnyCardList : setCardList // 俩个数组控制用户不停切换且数据处于loading的状态
    const List = fnc(arr) ?? []
    setLoading(false)
    setList(List)
  }, [active, getSMALLCard, getOtherCard])

  const getOwnCard = useCallback(async (account: string) => {
    setLoading(true)
    setCardList([])
    setBunnyCardList([])
    const res = await fetchCardsInfo(account) ?? []
    getList(res)
  }, [fetchCardsInfo, getList])

  useEffect(() => {
    if (account) void getOwnCard(account).then()
  }, [account, getOwnCard, active, shareMessage])

  useEffect(() => {
    return () => {
      dispatch(clearShareMessage())
    }
  }, [dispatch])

  const handleChange = (item: string) => {
    setActive(item)
  }
  const handleGo = () => {
    // history.push('/m/bunny/buyType')
    console.log(history)
    Toast.fail('System Upgrading')
  }
  const handleSend = (data: any) => { // 打开发送卡片
    setCardInfo(data)
    setShow(true)
  }
  const NoData = useMemo(() => {
    return (
      <div className='m-rabbit-home-no-data'>
        <C.WebImage src='rabbit/nodata.png' />
        <span>NO NFT CARD</span>
      </div>
    )
  }, [])
  const cards = useMemo(() => {
    const list = active === 'Bunnies' ? bunnyCardList : cardList
    if (loading) return <C.MLoading show section />
    if (list.length === 0) return NoData
    else {
      return <div className='m-rabbit-home-content'>
        {
          list.map((item: Record<string, any>) => <BunnyCard kind={item.kind} handleSend={() => handleSend(item)} key={item.tokenId} tokenId={item.tokenId} level={item.levelPower} rank={item?.types} />)
        }
      </div>
    }
  }, [cardList, NoData, loading, active, bunnyCardList])
  return (
    <div className='m-rabbit-home'>
      <div className="m-rabbit-home-white-paper">
        <a href="https://bsc-bunnypark.gitbook.io/adventure-bunny-1/" target="_blank">White Paper</a>
      </div>
      <div className='m-rabbit-home-tabs'>
        <C.Tab active={active} onChange={(item: string) => handleChange(item)} />
      </div>
      <>{cards}</>
      <C.Button onClick={handleGo}>BlindBox</C.Button>
      <BunnySendCard cardInfo={cardInfo} show={show} onClose={() => setShow(false)} />
    </div>
  )
}

export default Rabbit
