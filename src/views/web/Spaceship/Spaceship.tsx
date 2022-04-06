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
    <div className="web-bunny-ship-no-data">
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

  const handleFleetEv = useCallback((shipId: number) => (history.push(`/spaceship/${shipId}/seats`)), [history])

  const handleSendEv = (ship: Record<string, any>) => {
    setModalStatus('send')
    setSelectedCard(ship)
  }

  const handleCardTransferEv = useCallback(async (address: string) => {
    if (address && !isEmpty(selectedCard) && library && account) {
      setModalStatus('confirming')

      const { shipId } = selectedCard
      const response = await sendSpaceshipCard(library, account, address, shipId)
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
      <div className="web-buy-spaceship-content-four">
        {
          spaceships.map((ship) => (
            <div className="web-buy-spaceship-content-box" key={ship.shipId}>
              <ShipCard flips seat={ship.seat} handleSend={() => handleSendEv(ship)} />
              <C.WebButton size='small' type='blue' onClick={() => handleFleetEv(ship.shipId)}>Build a fleet</C.WebButton>
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
    <div className="web-bunny-ship">
      <C.WebTitle title='SpaceShips' />
      {ShipCards}
      <div className="web-bunny-ship-btn">
        <C.WebButton to="/spaceship/buy">Buy Spaceship</C.WebButton>
      </div>
      <C.WebSendCard
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
