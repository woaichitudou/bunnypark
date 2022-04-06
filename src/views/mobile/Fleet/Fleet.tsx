import { isEmpty } from 'lodash'
import { useHistory } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import CFleet from '@/class/Fleet'
import Adventure from '@/class/Adventure'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

import FleetCard from '../components/Card/FleetCard'

const NoData: FC = () => {
  const history = useHistory()

  return (
    <div className="m-header-fleet-no-data">
      <C.WebImage src='fleet/nodata.png' />
      <span>NO NFT CARD</span>
      <C.Button onClick={() => history.push('/m/spaceship')}>Build a fleet</C.Button>
    </div>
  )
}
// <C.Button onClick={() => history.push('/m/spaceship')}>Build a fleet</C.Button>

const Fleet: FC = () => {
  const history = useHistory()
  const { sendFleetCard } = CFleet
  const { queryFleetInBulk } = Adventure
  const { library, account } = useActiveWeb3React()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [modalStatus, setModalStatus] = useState<string>('')
  const [selectedCard, setSelectedCard] = useState<Record<any, any>>({})
  const [fleetsInfo, setFleetsInfo] = useState<Array<Record<string, any>>>([])

  const queryFleetInBulkCallback = useCallback(async (library, account) => {
    setIsLoading(true)
    const response = await queryFleetInBulk(library, account)
    setFleetsInfo(response)
    setIsLoading(false)
  }, [queryFleetInBulk])

  const handleSendEv = (fleet: Record<string, any>) => {
    setModalStatus('send')
    setSelectedCard(fleet)
  }

  const handleCardTransferEv = useCallback(async (address: string) => {
    if (address && !isEmpty(selectedCard) && library && account) {
      setModalStatus('confirming')

      const { tokenId } = selectedCard
      const response = await sendFleetCard(library, account, address, tokenId)
      // console.info(response)
      if (response) {
        setModalStatus('succeed')
        await queryFleetInBulkCallback(library, account)
      } else {
        setModalStatus('fail')
      }
    }
  }, [account, library, queryFleetInBulkCallback, selectedCard, sendFleetCard])

  const getInfo = useCallback(async () => {
    await queryFleetInBulkCallback(library, account)
  }, [library, account, queryFleetInBulkCallback])

  const FleetCards = useMemo(() => {
    if (isLoading) return (<C.MLoading show section/>)
    if (isEmpty(fleetsInfo) && !isLoading) return (<NoData/>)
    return (<div className="m-header-fleet-content">
      {
        fleetsInfo.map((fleet) => {
          let status = ''
          const isResting = !fleet.status
          const gasShortage = fleet.gas < fleet.power
          if (isResting) {
            status = 'rest'
          }
          if (gasShortage) {
            status = 'oilless'
          }
          return (
            <div key={fleet.tokenId} className="m-header-fleet-content-box">
              <FleetCard
                status={status}
                oil={fleet.gas}
                luck={(fleet.buff) / 10}
                type={fleet.type}
                power={fleet.power}
                tokenId={fleet.tokenId}
                lastBlock={fleet.lastBlock}
                handleSend={() => handleSendEv(fleet)}
                getInfo={getInfo}
                handleDetail={() => history.push(`/m/fleet/${fleet.tokenId}`)}
                handleBuyFuel={() => history.push(`/m/fleet/${fleet.tokenId}/gas`)}/>
              <C.Button
                size='small'
                disabled={isResting || gasShortage}
                onClick={() => history.push(`/m/fleet/${fleet.tokenId}/driving-mode?power=${fleet.power}`)}>Adventure</C.Button>
            </div>)
        })
      }
    </div>)
  }, [isLoading, fleetsInfo, history, getInfo])

  useEffect(() => {
    if (library && account) {
      void queryFleetInBulkCallback(library, account)
    }
  }, [account, library, queryFleetInBulkCallback])

  return (
    <div className='m-header-fleet'>
      <C.Title title='Fleet' />
      { FleetCards }

      <C.SendCard
        cardType='fleet'
        cardInfo={selectedCard}
        show={modalStatus === 'send'}
        onClick={handleCardTransferEv}
        onClose={() => setModalStatus('')} />
      <C.McpStatusWaitModal show={ modalStatus === 'confirming' }/>
      <C.McpStatusFailModal show={ modalStatus === 'fail' } onClose={() => setModalStatus('')}/>
      <C.McpStatusSuccModal show={ modalStatus === 'succeed'} onClose={() => setModalStatus('')} />
    </div>
  )
}

export default Fleet
