import React, { FC, useState, useEffect, useCallback, useMemo } from 'react'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { cardPower } from '@/class/const'
import Store from '@/class/Shop'

import C from '@/components'
import BunnyCard from '../components/Card/BunnyCard'

const Upgrade: FC = () => {
  const { fetchTokenIdToInfo } = Store
  const { params } = useRouteMatch()
  const history = useHistory()
  const { account } = useActiveWeb3React()
  const [quantity, setQuantity] = useState(1)
  const [cardInfo, setCardInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const tokenId = (params as any)?.tokenId

  const getData = useCallback(async () => {
    setLoading(true)
    const res = await fetchTokenIdToInfo(tokenId) ?? {}
    setLoading(false)
    setCardInfo({ ...res, tokenId })
  }, [fetchTokenIdToInfo, tokenId])

  useEffect(() => {
    if (account) void getData().then()
  }, [account, getData])

  const max = useMemo(() => {
    // 计算最大算力
    if (cardInfo) {
      // 设置初始当前算力值
      const { type, levelPower } = cardInfo as any
      return cardPower[type] - levelPower
    }
    return 1
  }, [cardInfo])

  const isCanbuy = useMemo(() => {
    if (cardInfo) {
      const { type, levelPower } = cardInfo as any
      return cardInfo && levelPower < cardPower[type]
    }
    return false
  }, [cardInfo])

  const handleBuy = () => {
    const { levelPower } = cardInfo as any
    history.push(`/bunny/upgrade/pay/${tokenId}/${levelPower}/${quantity}`)
  }

  return (
    <div className='web-rabbit-upgrade'>
      {/* <C.BackButton /> */}
      <C.WebTitle title='Upgrade Combat Power'/>
      <p className='desc'>Select an Adventure Bunny card and the Combat Power level you wish to upgrade to. Then, pay for the fee.</p>
      <div className='web-rabbit-upgrade-card'>
        {
          loading ? <C.MLoading show section/> : <BunnyCard kind={(cardInfo as any)?.kind} tokenId={(cardInfo as any)?.tokenId} level={(cardInfo as any)?.levelPower} rank={(cardInfo as any)?.type} size='small' rear={Boolean(false)}/>
        }
      </div>
      <div className='web-rabbit-upgrade-step'>
        <span>Level</span>
        <C.WebStepper min={1} max={max} value={quantity} onChange={(val: number) => setQuantity(val)}/>
      </div>
      <div className='web-rabbit-upgrade-btn'><C.WebButton disabled={!isCanbuy} onClick={handleBuy}>Buy Now</C.WebButton></div>
    </div>
  )
}

export default Upgrade
