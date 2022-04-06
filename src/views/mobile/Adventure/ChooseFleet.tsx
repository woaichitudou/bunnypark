import { isEmpty } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import Adventure from '@/class/Adventure'
import { useAppDispatch } from '@/state'
import { setShareMessage } from '@/state/share'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

import FleetCard from '../components/Card/FleetCard'

const NoCards = () => {
  return (
    <div className="m-bunny-ship-no-data">
      <span>NO FLEETS</span>
    </div>
  )
}

const ChooseFleet: FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { library, account } = useActiveWeb3React()
  const { cityId, capacity } = useParams<Record<string, any>>()
  const { queryFleetInBulk } = Adventure

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [modalStatus, setModalStatus] = useState<string>('')
  const [selectedFleet, setSelectedFleet] = useState<Record<string, any>>({})
  const [fleetsInfo, setFleetsInfo] = useState<Array<Record<string, any>>>([])

  const handleChangeEv = (fleet: Record<string, any>) => (setSelectedFleet(fleet))

  const handleFleetEv = () => (history.push('/m/spaceship'))

  const queryFleetInBulkCallback = useCallback(async (library, account) => {
    const response = await queryFleetInBulk(library, account)
    if (!isEmpty(response)) {
      const filter = response.filter((f: Record<string, any>) => f.power >= capacity && f.status && (f.gas >= f.power))
      // console.info(filter)
      setFleetsInfo(filter)
      setSelectedFleet(filter[0])
    }
    setIsLoading(false)
  }, [capacity, queryFleetInBulk])

  const handleAdventureEv = useCallback(async () => {
    if (!isEmpty(selectedFleet) && cityId) {
      // console.info(cityId)
      dispatch(setShareMessage(cityId))
      history.push(`/m/fleet/${selectedFleet.tokenId}/driving-mode`)
    }
  }, [selectedFleet, cityId, dispatch, history])

  const Fleets = useMemo(() => {
    if (isLoading) return (<C.MLoading show section/>)
    if (isEmpty(fleetsInfo) && !isLoading) return (<NoCards/>)
    return (<div className="m-choose-fleet-content">
      {
        fleetsInfo.map((fleet) => (
          <div className="m-choose-fleet-content-box" key={ fleet.tokenId }>
            <div className="m-choose-fleet-content-box-card">
              <FleetCard
                rear={false}
                oil={fleet.gas}
                luck={(fleet.buff) / 10}
                type={fleet.type}
                power={fleet.power}
                tokenId={fleet.tokenId}
                handleSend={() => console.info('TODO send card!!!')}
                handleDetail={() => history.push(`/m/fleet/${fleet.tokenId}`)}
                handleBuyFuel={() => history.push(`/m/fleet/${fleet.tokenId}/gas`)}/>
            </div>
            <div className="m-choose-fleet-content-box-radio">
              <div className="m-choose-fleet-content-box-radio-min">
                <input type="radio" checked={ fleet.tokenId === selectedFleet.tokenId }
                  onChange={ () => handleChangeEv(fleet) } id={ `radio${fleet.tokenId}` }/>
                <label htmlFor={ `radio${fleet.tokenId}` }>
                  <span/>
                </label>
              </div>
            </div>
          </div>))
      }
    </div>)
  }, [isLoading, fleetsInfo, selectedFleet, history])

  useEffect(() => {
    if (library && account) {
      void queryFleetInBulkCallback(library, account)
    }
  }, [account, library, queryFleetInBulkCallback])

  return (
    <div className='m-choose-fleet'>
      <C.BackButton backUrl='/m/adventure/cities'/>
      <C.Title title=' Select fleet card'/>
      { Fleets }
      <div className="m-choose-fleet-btn">
        {
          (isEmpty(fleetsInfo) && !isLoading)
            ? <C.Button type='blue' onClick={ handleFleetEv }>Build a fleet</C.Button>
            : <C.Button type='blue' onClick={ handleAdventureEv }>Adventure</C.Button>
        }
      </div>

      <C.McpStatusWaitModal show={ modalStatus === 'confirming' }/>
      <C.McpStatusFailModal show={ modalStatus === 'fail' } onClose={() => setModalStatus('')}/>
      <C.McpStatusSuccModal show={ modalStatus === 'succeed'} onClose={() => setModalStatus('')} />
    </div>
  )
}

export default ChooseFleet
