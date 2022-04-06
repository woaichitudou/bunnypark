import { isEmpty } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useState } from 'react'

import C from '@/components'
import Result from './Result'
import { useAppDispatch } from '@/state'
import Adventure from '@/class/Adventure'
import { clearShareMessage } from '@/state/share'
import useQueryString from '@/hooks/useQueryString'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import { securityInterception } from '@/utils/formatBalance'
import { paymentData } from '@/components/mobile/PayTicketsModal'

const ChooseCity: FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { cockpit } = useQueryString()
  const { library, account } = useActiveWeb3React()
  const { cityId, fleetId } = useParams<Record<string, any>>()
  const { todoAdventure, queryAdventureCities } = Adventure

  const [isDisabled, setIsDisabled] = useState(false)
  const [modalStatus, setModalStatus] = useState<string>('')
  const [ventureRes, setVentureRes] = useState<Record<string, any>>({})
  const [entranceFee, setEntranceFee] = useState<Record<string, any>>({})
  const [ventureCity, setVentureCity] = useState<Record<string, any>>({})

  const queryAdventureCitiesCallback = useCallback(async (library) => {
    const response = await queryAdventureCities(library)
    if (!isEmpty(response)) {
      const find = response.find((city: Record<string, any>) => city.cityId === Number(cityId))
      const { power: maxPower, ticket: { usdAmount: maxUsdAmount }, reward: maxReward } = response[response.length - 1]
      if (find) {
        const { cityName, power, reward, ticket: { usdAmount, bgAmount }, successRate } = find
        const _power = { number: power, weight: `${(power / maxPower) * 100}%` }
        const _ticket = { number: securityInterception(usdAmount ?? 0, 3), weight: `${(usdAmount / maxUsdAmount) * 100}%`, bgAmount }
        const _reward = { number: securityInterception(reward ?? 0, 3), weight: `${(reward / maxReward) * 100}%` }
        const _successRate = { number: successRate / 10, weight: `${successRate / 10}%` }
        setVentureCity({
          cityName,
          power: _power,
          ticket: _ticket,
          reward: _reward,
          successRate: _successRate
        })
      }
    }
  }, [cityId, queryAdventureCities])

  const todoAdventureEv = useCallback(async (library, account, payment) => {
    const response = await todoAdventure(library, account, cockpit ?? 0, fleetId, cityId, payment)

    setVentureRes(response)
    setIsDisabled(false)
    setModalStatus('result')
  }, [cityId, cockpit, fleetId, todoAdventure])

  const handleConfirmEv = useCallback(async () => {
    if (cityId && !isEmpty(ventureCity)) {
      // console.info(ventureCity)
      const { ticket } = ventureCity
      setEntranceFee(ticket)
      setModalStatus('ticket')
    }
  }, [cityId, ventureCity])

  const handleTicketEv = useCallback(async (payment: string) => {
    if (library && account) {
      const _payment = paymentData.find((p: Record<string, any>) => p.key === payment)?.value ?? 1
      setIsDisabled(true)
      setModalStatus('confirming')
      // 冒险效果 TODO
      await todoAdventureEv(library, account, _payment)
    }
  }, [account, library, todoAdventureEv])

  useEffect(() => {
    if (library) {
      void queryAdventureCitiesCallback(library)
    }
  }, [library, queryAdventureCitiesCallback])

  useEffect(() => {
    return () => {
      dispatch(clearShareMessage())
    }
  }, [dispatch])

  return (
    <div className='m-choose-city'>
      <C.BackButton backUrl='/m/adventure/cities' />
      <C.Title title='Destination' />
      <p>Start your adventure to {ventureCity?.cityName}</p>
      {
        !isEmpty(ventureCity) &&
        (<C.CityCard
          btnName='Confirm'
          disabled={isDisabled}
          power={ventureCity?.power}
          ticket={ventureCity?.ticket}
          earnings={ventureCity?.reward}
          cityName={ventureCity?.cityName}
          successRate={ventureCity?.successRate}
          onClick={handleConfirmEv} />)
      }
      <Result
        bg={ventureRes.reward}
        succeed={ventureRes.result}
        show={modalStatus === 'result'}
        cityName={ventureCity?.cityName ?? '-'}
        callback={() => history.push('/m/adventure/cities')}
        onClose={() => setModalStatus('')} />
      <C.PayTicketsModal
        show={modalStatus === 'ticket'}
        entranceFee={entranceFee}
        onClick={handleTicketEv}
        onClose={() => setModalStatus('')} />
      <C.McpStatusWaitModal show={modalStatus === 'confirming'} />
      <C.McpStatusFailModal show={modalStatus === 'fail'} onClose={() => setModalStatus('')} />
      <C.McpStatusSuccModal show={modalStatus === 'succeed'} onClose={() => setModalStatus('')} />
    </div>
  )
}

export default ChooseCity
