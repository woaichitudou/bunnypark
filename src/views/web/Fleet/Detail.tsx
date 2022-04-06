import { isEmpty } from 'lodash'
import { useParams } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import Adventure from '@/class/Adventure'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

import BunnyCard from '../components/Card/BunnyCard'

const Details: FC = () => {
  const { library } = useActiveWeb3React()
  const { querySingleFleetInfo } = Adventure
  const { fleetId } = useParams<Record<string, any>>()

  const [fleetInfo, setFleetInfo] = useState<Record<string, any>>()

  const querySingleFleetInfoCallback = useCallback(async (library) => {
    const response = await querySingleFleetInfo(library, fleetId)
    // console.info(response)
    if (!isEmpty(response)) {
      setFleetInfo(response)
    }
  }, [fleetId, querySingleFleetInfo])

  const Cards = useMemo(() => {
    const target = fleetInfo?.cards
    if (!isEmpty(target)) {
      return target.map(({ tokenId, type, level, kind }: Record<string, any>) => (
        <div key={tokenId} className="web-details-content-box">
          <BunnyCard rear={false} rank={type} kind={kind} tokenId={tokenId} level={level} />
        </div>
      ))
    }
    return null
  }, [fleetInfo])

  useEffect(() => {
    if (library) {
      void querySingleFleetInfoCallback(library)
    }
  }, [library, querySingleFleetInfoCallback])

  return (
    <div className='web-details-bg'>
      <div className='web-details'>
        <C.WebTitle title='Details' />
        <div className="web-details-label">
          <div className="web-details-label-left">
            <C.WebImage src='adventure/icon-3.png' />
            <span>{fleetInfo?.power ?? 0}</span>
            <div className="web-details-label-border">
              <em />
            </div>
            <label>Combat power</label>
          </div>
          <div className="web-details-label-right">
            <C.WebImage src='adventure/icon-4.png' />
            <span>{(fleetInfo?.buff ?? 0) / 10}%</span>
            <div className="web-details-label-border">
              <em />
            </div>
            <label>success rate</label>
          </div>
        </div>
        <C.WebTitle title='passenger compartment' type='min' />
        <div className="web-details-content">
          {Cards}
        </div>
      </div>
    </div>
  )
}

export default Details
