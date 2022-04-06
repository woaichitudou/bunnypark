import { isEmpty } from 'lodash'
import { useHistory } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import { useAppDispatch } from '@/state'
import Spaceship from '@/class/Spaceship'
import { clearSelectedFleetMember } from '@/state/fleet'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

import ShipCard from '../components/Card/ShipCard'

const NoCards = () => {
  return (
    <div className="m-bunny-ship-no-data">
      <span>NO SPACESHIPS</span>
    </div>
  )
}

const Spaceships: FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { library, account } = useActiveWeb3React()
  const { querySpaceshipsInfo, sendSpaceshipCard } = Spaceship

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [modalStatus, setModalStatus] = useState<string>('')
  const [selectedCard, setSelectedCard] = useState<Record<any, any>>({})
  const [spaceships, setSpaceships] = useState<Array<Record<string, any>>>([])

  const querySpaceshipsInfoCallback = useCallback(async (library, account) => {
    setIsLoading(true)
    const response = await querySpaceshipsInfo(library, account)
    setSpaceships(response)
    setIsLoading(false)
  }, [querySpaceshipsInfo])

  const handleFleetEv = useCallback((shipId: number) => (history.push(`/m/spaceship/${shipId}/seats`)), [history])

  const handleSendEv = (ship: Record<string, any>) => {
    setModalStatus('send')
    setSelectedCard(ship)
  }

  const handleCardTransferEv = useCallback(async (address: string) => {
    if (address && !isEmpty(selectedCard) && library && account) {
      setModalStatus('confirming')

      const { shipId } = selectedCard
      const response = await sendSpaceshipCard(library, account, address, shipId)
      // console.info(response)
      if (response) {
        setModalStatus('succeed')
        await querySpaceshipsInfoCallback(library, account)
      } else {
        setModalStatus('fail')
      }
    }
  }, [account, library, querySpaceshipsInfoCallback, selectedCard, sendSpaceshipCard])

  const ShipCards = useMemo(() => {
    if (isLoading) return (<C.MLoading show section />)
    if (isEmpty(spaceships) && !isLoading) return (<NoCards />)
    return (
      <div className="m-buy-spaceship-content">
        {
          spaceships.map((ship) => (
            <div className="m-buy-spaceship-content-box" key={ship.shipId}>
              <ShipCard flips seat={ship.seat} handleSend={() => handleSendEv(ship)} />
              <C.Button size='small' type='blue' onClick={() => handleFleetEv(ship.shipId)}>Build a fleet</C.Button>
            </div>))
        }
      </div>
    )
  }, [handleFleetEv, isLoading, spaceships])

  useEffect(() => {
    if (library && account) {
      void querySpaceshipsInfoCallback(library, account)
    }
  }, [account, library, querySpaceshipsInfoCallback])

  useEffect(() => {
    return () => {
      dispatch(clearSelectedFleetMember())
    }
  }, [dispatch])

  return (
    <div className="m-bunny-ship">
      <C.Title title='SpaceShips' />
      {ShipCards}
      <div className="m-bunny-ship-btn">
        <C.Button to="/m/spaceship/buy">Buy Spaceship</C.Button>
      </div>

      <C.SendCard
        cardType='spaceship'
        cardInfo={selectedCard}
        show={modalStatus === 'send'}
        onClick={handleCardTransferEv}
        onClose={() => setModalStatus('')} />
      <C.McpStatusWaitModal show={modalStatus === 'confirming'} />
      <C.McpStatusFailModal show={modalStatus === 'fail'} onClose={() => setModalStatus('')} />
      <C.McpStatusSuccModal show={modalStatus === 'succeed'} onClose={() => setModalStatus('')} />
    </div>
  )
}

export default Spaceships
