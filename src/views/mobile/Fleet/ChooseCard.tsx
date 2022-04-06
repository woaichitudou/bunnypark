import { isEmpty } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import { useAppDispatch } from '@/state'
import Adventure from '@/class/Adventure'
import { setSelectedPilot } from '@/state/pilot'
import { useSelectedPilot } from '@/state/pilot/hooks'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

import ShareCard from '../components/Card/ShareCard'

interface Props {
  card: Record<string, any>
  selectedCard: string | number
  handleChange: (index: any) => void
}

const NoCards = () => {
  return (
    <div className="m-bunny-ship-no-data">
      <span>NO SHARE CARDS</span>
    </div>
  )
}

const Card: FC<Props> = ({ card, selectedCard, handleChange }) => {
  const { tokenId } = card
  return (
    <div className="m-choose-card-content-box m-fleet-choose-content-box">
      <div className="m-choose-card-content-box-card">
        <ShareCard card={card} />
      </div>
      <div className="m-choose-card-content-box-radio">
        <div className="m-choose-card-content-box-radio-min">
          <input type="radio" checked={tokenId === selectedCard} onChange={() => handleChange(tokenId)} id={`radio${tokenId}`} />
          <label htmlFor={`radio${tokenId}`}>
            <span />
          </label>
        </div>
      </div>
    </div>
  )
}

const ChooseCard: FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const pilotData = useSelectedPilot()
  const { queryShareCardsInfo } = Adventure
  const { library, account } = useActiveWeb3React()
  const { fleetId } = useParams<Record<string, any>>()

  const [chooseCard, setChooseCard] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shareCards, setShareCards] = useState<Array<Record<string, any>>>([])

  const queryShareCardsInfoCallback = useCallback(async (library, account) => {
    setIsLoading(true)
    const response = await queryShareCardsInfo(library, account)
    // console.info(response)
    if (!isEmpty(response)) {
      const filter = response.filter((m: Record<string, any>) => ((pilotData.tokenId !== Number(m.tokenId)) && m.status))
      setShareCards(filter)
      setChooseCard(filter[0])
    }
    setIsLoading(false)
  }, [pilotData, queryShareCardsInfo])

  const handleChangeEv = (card: Record<string, any>) => (setChooseCard(card))

  const handleConfirmEv = () => {
    if (!isEmpty(chooseCard)) {
      // console.info(chooseCard)
      dispatch(setSelectedPilot({ ...chooseCard }))
      history.push(`/m/fleet/${fleetId}/pilot`)
    }
  }

  const BunnyCards = useMemo(() => {
    if (isLoading) return (<C.MLoading show section/>)
    if (isEmpty(shareCards) && !isLoading) return (<NoCards />)
    return (
      <div className="m-choose-card-content">
        {
          shareCards.map((card, index) => (
            <Card
              card={card}
              key={card.tokenId}
              selectedCard={chooseCard?.tokenId}
              handleChange={() => { handleChangeEv(card) }} />))
        }
      </div>
    )
  }, [isLoading, shareCards, chooseCard?.tokenId])

  useEffect(() => {
    if (library && account) {
      void queryShareCardsInfoCallback(library, account)
    }
  }, [account, library, queryShareCardsInfoCallback])

  return (
    <div className='m-choose-card'>
      <C.BackButton />
      <C.Title title='Choose the card'/>
      <p>you would like to add</p>
      { BunnyCards }
      <div className="m-choose-card-btn"><C.Button disabled={isEmpty(chooseCard)} onClick={handleConfirmEv}>Add</C.Button></div>
    </div>
  )
}

export default ChooseCard
