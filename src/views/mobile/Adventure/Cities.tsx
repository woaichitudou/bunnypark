import { isEmpty } from 'lodash'
import { useHistory } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import Adventure from '@/class/Adventure'
import useTokenBalance from '@/hooks/useTokenBalance'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import { securityInterception } from '@/utils/formatBalance'
import { getBGAddress } from '@/config/common/addressHelpers'

const Cities: FC = () => {
  const history = useHistory()
  const { library, account } = useActiveWeb3React()
  const balance = useTokenBalance(getBGAddress())
  const { todoHarvest, queryAdventureCities, queryVirtualAccountInfo } = Adventure

  const [modalStatus, setModalStatus] = useState<string>('')
  const [accountInfo, setAccountInfo] = useState<Record<string, any> | null>(null)
  const [ventureCities, setVentureCities] = useState<Array<Record<string, any>>>([])

  const queryAdventureCitiesCallback = useCallback(async (library) => {
    const response = await queryAdventureCities(library)
    // console.info(response)
    if (!isEmpty(response)) setVentureCities(response)
  }, [queryAdventureCities])

  const queryVirtualAccountInfoCallback = useCallback(async (library, account) => {
    const response = await queryVirtualAccountInfo(library, account)
    if (response) setAccountInfo(response)
  }, [queryVirtualAccountInfo])

  const handleHarvestEv = useCallback(async () => {
    if (library && account) {
      setModalStatus('confirming')
      const response = await todoHarvest(library, account)
      if (response) {
        setModalStatus('succeed')
        await queryVirtualAccountInfoCallback(library, account)
      } else setModalStatus('fail')
    }
  }, [account, library, queryVirtualAccountInfoCallback, todoHarvest])

  const handleAdventureEv = useCallback((cityId: number, power: number) => {
    history.push(`/m/adventure/cities/${cityId}/capacity/${power}/fleet`)
    // history.push('/m/coming-soon')
  }, [history])

  const isDisabled = useMemo(() => (accountInfo ? !(accountInfo?.harvestAmount > 0) : true), [accountInfo])

  const CitiesCards = useMemo(() => {
    if (!isEmpty(ventureCities)) {
      const { power: maxPower, ticket: { usdAmount: maxUsdAmount }, reward: maxReward } = ventureCities[ventureCities.length - 1]
      return ventureCities.map(({ cityId, cityName, power, reward, ticket: { usdAmount }, successRate }) => {
        const _power = { number: power, weight: `${(power / maxPower) * 100}%` }
        const _ticket = { number: securityInterception(usdAmount ?? 0, 3), weight: `${(usdAmount / maxUsdAmount) * 100}%` }
        const _reward = { number: securityInterception(reward ?? 0, 3), weight: `${(reward / maxReward) * 100}%` }
        const _successRate = { number: successRate / 10, weight: `${successRate / 10}%` }
        return (
          <C.CityCard
            key={cityId}
            power={_power}
            ticket={_ticket}
            earnings={_reward}
            cityName={cityName}
            successRate={_successRate}
            onClick={() => handleAdventureEv(cityId, power)} />
        )
      })
    }
    return null
  }, [handleAdventureEv, ventureCities])

  useEffect(() => {
    if (library && account) {
      void queryVirtualAccountInfoCallback(library, account)
    }
  }, [account, library, queryVirtualAccountInfoCallback])

  useEffect(() => {
    if (library) {
      void queryAdventureCitiesCallback(library)
    }
  }, [library, queryAdventureCitiesCallback])
  return (
    <div className='m-cities'>
      <C.BackButton backUrl='/m' />
      <div className="m-cities-dashboard">
        <C.WebImage src='adventure/icon-6.png' />
        <label>≈$ <span>{securityInterception(accountInfo?.totalAmount ?? 0, 3)}(in $ BG)</span></label>
        <p>The withdrawal fee reduces by 2% daily for 15 days. After which, there will be no fee. The fee will be reset whenever a withdrawal is made.</p>
        <small>Withdrawal fee:{securityInterception((accountInfo?.feeDay ?? 0) * 2, 3)}%</small>
        <C.Button type='blue' disabled={isDisabled} onClick={() => setModalStatus('confirm')}>Withdraw</C.Button>
      </div>
      <div className="m-cities-list">
        {CitiesCards}
      </div>

      <C.McpStatusWaitModal show={modalStatus === 'confirming'} />
      <C.McpStatusFailModal show={modalStatus === 'fail'} onClose={() => setModalStatus('')} />
      <C.McpStatusSuccModal show={modalStatus === 'succeed'} onClose={() => setModalStatus('')} />
      <C.WillGetModal
        usdt={securityInterception(balance, 3)}
        serviceFee={securityInterception((accountInfo?.feeDay ?? 0) * 2, 3)}
        bg={securityInterception(accountInfo?.harvestAmountBG ?? 0, 3)}
        dollar={securityInterception(accountInfo?.harvestAmount ?? 0, 3)}
        show={modalStatus === 'confirm'}
        onClick={handleHarvestEv}
        onClose={() => setModalStatus('')} />
    </div>
  )
}

export default Cities
