import { isEmpty } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import { useAppDispatch } from '@/state'
import Spaceship from '@/class/Spaceship'
import { setSelectedFleetMember } from '@/state/fleet'
import { useSelectedFleetMember } from '@/state/fleet/hooks'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

import BunnyCard from '../components/Card/BunnyCard'

interface Porps {
  type: string
  kind: number
  level: number
  tokenId: number
  selectedCard: string | number
  handleChange: (index: any) => void
}

const NoCards = () => {
  return (
    <div className="web-bunny-ship-no-data">
      <span>NO CARDS</span>
    </div>
  )
}

const Card: FC<Porps> = ({ type, kind, level, tokenId, selectedCard, handleChange }) => {
  return (
    <div className="web-choose-card-content-box">
      <div className="web-choose-card-content-box-card">
        <BunnyCard rear={false} kind={kind} rank={type} tokenId={tokenId} level={level}/>
      </div>
      <div className="web-choose-card-content-box-radio">
        <div className="web-choose-card-content-box-radio-min">
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
  const { queryBunnyCardsInfo } = Spaceship
  const fleetData = useSelectedFleetMember()
  const { library, account } = useActiveWeb3React()
  const { shipId, position } = useParams<Record<string, any>>()

  const [chooseCard, setChooseCard] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [bunnyCards, setBunnyCards] = useState<Array<Record<string, any>>>([])

  const queryBunnyCardsInfoCallback = useCallback(async (library, account) => {
    const response = await queryBunnyCardsInfo(library, account)
    if (!isEmpty(response)) {
      const filter = response.filter((m: Record<string, any>) => {
        const findIndex = fleetData.findIndex((n) => n.tokenId === m.tokenId)
        return findIndex === -1
      })
      setBunnyCards(filter)
      setChooseCard(filter[0])
    }
    setIsLoading(false)
  }, [fleetData, queryBunnyCardsInfo])

  const handleChangeEv = (card: Record<string, any>) => (setChooseCard(card))

  const handleConfirmEv = useCallback(() => {
    if (!isEmpty(chooseCard)) {
      dispatch(setSelectedFleetMember({ ...chooseCard, position }))
      history.push(`/spaceship/${shipId}/seats`)
    }
  }, [chooseCard, dispatch, history, position, shipId])

  const SwitchButton = useMemo(() => {
    if (!isLoading) {
      return isEmpty(bunnyCards) ? (<C.WebButton onClick={() => history.push('/bunny/blind-box/buy')}>BlindBox</C.WebButton>) : (<C.WebButton onClick={handleConfirmEv}>Add</C.WebButton>)
    }
    return null
  }, [bunnyCards, handleConfirmEv, history, isLoading])

  const BunnyCards = useMemo(() => {
    if (isLoading) return (<C.MLoading show section/>)
    if (isEmpty(bunnyCards) && !isLoading) return (<NoCards />)
    return (
      <div className="web-choose-card-content">
        {
          bunnyCards.map((card, index) => (
            <Card
              type={card.type}
              kind={card.kind}
              key={card.tokenId}
              level={card.level}
              tokenId={card.tokenId}
              selectedCard={chooseCard?.tokenId}
              handleChange={() => { handleChangeEv(card) }} />))
        }
      </div>
    )
  }, [isLoading, bunnyCards, chooseCard?.tokenId])

  useEffect(() => {
    if (library && account) {
      void queryBunnyCardsInfoCallback(library, account)
    }
  }, [account, library, queryBunnyCardsInfoCallback])

  return (
    <div className='web-choose-card'>
      <C.WebTitle title='Choose the card'/>
      <p>you would like to add</p>
      { BunnyCards }
      <div className="web-choose-card-btn">{ SwitchButton }</div>
    </div>
  )
}

export default ChooseCard
