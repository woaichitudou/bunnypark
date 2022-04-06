import React, { FC, useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import C from '@/components'
import Adventure from '@/class/Adventure'
import useQueryString from '@/hooks/useQueryString'
import { useShareMessage } from '@/state/share/hooks'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

const DriveMode: FC = () => {
  const history = useHistory()
  const { power } = useQueryString()
  const { library } = useActiveWeb3React()
  const { matchCitiesByCapacity } = Adventure
  const { shareMessage: cityId } = useShareMessage()
  const { fleetId } = useParams<Record<string, any>>()
  // console.info('shareMessage', cityId)
  const [bestVentureCity, setBestVentureCity] = useState<number>()

  const handleDrivingModeEv = (mode: string) => {
    if (mode === 'auto') {
      if (cityId) {
        history.push(`/adventure/cities/${cityId}/fleet/${fleetId}`)
      }
      // 禁止在未查询到战力匹配城市ID之前跳转
      if (Number.isInteger(bestVentureCity)) {
        history.push(`/adventure/cities/${bestVentureCity}/fleet/${fleetId}`)
      }
    } else {
      history.push(`/fleet/${fleetId}/pilot`)
    }
  }

  const matchCitiesByCapacityCallback = useCallback(async (library) => {
    const response = await matchCitiesByCapacity(library, power as any)
    setBestVentureCity(response)
  }, [matchCitiesByCapacity, power])

  useEffect(() => {
    if (library && !cityId) {
      void matchCitiesByCapacityCallback(library)
    }
  }, [library, matchCitiesByCapacityCallback, cityId])

  return (
    <div className="web-drive-mode-bg">
      <div className='web-drive-mode'>
        <div className="web-drive-mode-box" onClick={() => handleDrivingModeEv('auto')}>
          <C.WebImage src='fleet/icon-a.png' />
          <span>Autopilot</span>
        </div>
        <div className="web-drive-mode-box" onClick={() => handleDrivingModeEv('pilot')}>
          <C.WebImage src='fleet/icon-b.png' />
          <span>Manual driving</span>
        </div>
      </div>
    </div>
  )
}

export default DriveMode
