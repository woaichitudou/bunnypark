import React, { FC, useCallback, useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import Store from '@/class/Shop'
// import { sleep } from '@/utils/tools'
import { useAppDispatch } from '@/state'
import { updateSelectedFleetMember } from '@/state/fleet'

import C from '@/components'
import BunnyCard from '../components/Card/BunnyCard'
import 'swiper/swiper.scss'

const BuySucceed: FC = () => {
  const dispatch = useAppDispatch()
  const { params } = useRouteMatch()
  const { account } = useActiveWeb3React()
  const history = useHistory()
  const { fetchTokenIdToInfo } = Store
  const [cardInfo, setCardInfo] = useState({})
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async () => {
    setLoading(true)
    // await sleep(6000) // 升级过后查询的数据节点有延迟
    const tokenId = (params as any)?.tokenId
    const res = await fetchTokenIdToInfo(tokenId) ?? {}
    setLoading(false)
    setCardInfo({ ...res, tokenId })
    // 战力升级可能影响缓存中的卡战力数据，要做一次单卡匹配更新数据更新 TODO
    dispatch(updateSelectedFleetMember({ tokenId, power: (res?.levelPower ?? 0) * 100 }))
  }, [dispatch, fetchTokenIdToInfo, params])

  useEffect(() => {
    if (account) void getData().then()
  }, [account, getData])

  const handleGo = () => {
    history.push('/m/spaceship')
  }
  return (
    <div className='m-rabbit-upgrade-suc'>
      <C.BackButton onClick={() => history.replace('/m/bunny')}/>
      <div className='title'>The upgrade is done</div>
      <div className='card'>
        {
          loading ? <C.MLoading show section/> : <BunnyCard kind={(cardInfo as any)?.kind} tokenId={(cardInfo as any)?.tokenId} level={(cardInfo as any)?.levelPower} rank={(cardInfo as any)?.type} size='small' rear={Boolean(false)}/>
        }
      </div>
      <div className='m-rabbit-upgrade-suc-btn' onClick={handleGo}>
        <span>Build a Fleet</span>
        <C.WebImage src="rabbit/icon-go.png" />
      </div>
    </div>
  )
}

export default BuySucceed
