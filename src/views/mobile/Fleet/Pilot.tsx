import { isEmpty } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import { useAppDispatch } from '@/state'
import Adventure from '@/class/Adventure'
import { delSelectedPilot } from '@/state/pilot'
import { useShareMessage } from '@/state/share/hooks'
import { useSelectedPilot } from '@/state/pilot/hooks'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

const Pilot: FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const pilotData = useSelectedPilot()
  const { library } = useActiveWeb3React()
  const { shareMessage: cityId } = useShareMessage()
  const { fleetId } = useParams<Record<string, any>>()
  const { querySingleFleetInfo, matchCitiesByCapacity } = Adventure
  // console.info(pilotData)
  const [bestVentureCity, setBestVentureCity] = useState<number>()
  const [fleetInfo, setFleetInfo] = useState<Record<string, any>>()

  const matchCitiesByCapacityCallback = useCallback(async (library) => {
    if (fleetInfo?.power) {
      const response = await matchCitiesByCapacity(library, fleetInfo?.power)
      setBestVentureCity(response)
    }
  }, [fleetInfo, matchCitiesByCapacity])

  const querySingleFleetInfoCallback = useCallback(async (library) => {
    const response = await querySingleFleetInfo(library, fleetId)
    if (!isEmpty(response)) {
      setFleetInfo(response)
    }
  }, [fleetId, querySingleFleetInfo])

  const isDisabled = useMemo(() => !(pilotData.tokenId), [pilotData.tokenId])

  const handleChoosePilotEv = () => (history.push(`/m/fleet/${fleetId}/pilot/choose`))

  const handleAdventureEv = useCallback(() => {
    if (pilotData.tokenId && fleetId) {
      const pilot = pilotData.tokenId
      if (cityId) {
        history.push(`/m/adventure/cities/${cityId}/fleet/${fleetId}?cockpit=${pilot}`)
      }
      // 禁止在未查询到战力匹配城市ID之前跳转
      if (Number.isInteger(bestVentureCity)) {
        history.push(`/m/adventure/cities/${bestVentureCity}/fleet/${fleetId}?cockpit=${pilot}`)
      }
    }
  }, [bestVentureCity, cityId, fleetId, history, pilotData])

  const handleDelPilotEv = () => {
    dispatch(delSelectedPilot())
  }

  const backUrl = useMemo(() => {
    const params = !isEmpty(fleetInfo) ? `?power=${fleetInfo?.power ?? 0}` : ''
    return `/m/fleet/${fleetId}/driving-mode${params}`
  }, [fleetId, fleetInfo])

  const shareCardBuff = useMemo(() => Number(pilotData.buff), [pilotData])

  useEffect(() => {
    if (library && !cityId) {
      void matchCitiesByCapacityCallback(library)
    }
  }, [library, matchCitiesByCapacityCallback, cityId])

  useEffect(() => {
    if (library) {
      void querySingleFleetInfoCallback(library)
    }
  }, [library, querySingleFleetInfoCallback])

  useEffect(() => {
    return () => {
      dispatch(delSelectedPilot())
    }
  }, [dispatch])

  return (
    <div className='m-pilot'>
      <C.BackButton backUrl={backUrl} />
      <C.Title title='Add driver' />
      {
        pilotData.tokenId
          ? (<div className="m-pilot-icon" onClick={handleDelPilotEv}>
            <C.WebImage src={`cards/share-${pilotData.type}.png`} />
            <span>×</span>
            <del onClick={handleDelPilotEv} />
          </div>)
          : (<div className="m-pilot-icon" onClick={handleChoosePilotEv} />)
      }
      <div className="m-pilot-label">
        <div className="m-pilot-label-left">
          <C.WebImage src='adventure/icon-3.png' />
          <span>{fleetInfo?.power ?? 0}</span>
          <div className="m-pilot-label-border">
            <em />
          </div>
          <label>Combat power</label>
        </div>
        <div className="m-pilot-label-right">
          <C.WebImage src='adventure/icon-4.png' />
          <span>{Number(fleetInfo?.buff ?? 0) / 10 + shareCardBuff}%</span>
          <div className="m-pilot-label-border">
            <em />
          </div>
          <label>success rate</label>
        </div>
      </div>
      <div className="m-pilot-btn">
        <C.Button type='yellow' disabled={isDisabled} onClick={handleAdventureEv}>Comfirm</C.Button>
      </div>
    </div>
  )
}

export default Pilot
