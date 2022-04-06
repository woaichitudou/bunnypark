import { isEmpty } from 'lodash'
import { useHistory } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useState, useMemo } from 'react'

import C from '@/components'
import Spaceship from '@/class/Spaceship'
import ShipCard from '../components/Card/ShipCard'
import useTokenBalance from '@/hooks/useTokenBalance'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import { getBPAddress } from '@/config/common/addressHelpers'
import { securityInterception } from '@/utils/formatBalance'

const NoCards = () => {
  return (
    <div className="web-bunny-ship-no-data">
      <span>NO SPACESHIPS</span>
    </div>
  )
}

const BuyShip: FC = () => {
  const history = useHistory()
  const balance = useTokenBalance(getBPAddress())
  const { library, account } = useActiveWeb3React()
  const { queryPurchasePriceOfShips, purchaseAspacecraft } = Spaceship

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [modalStatus, setModalStatus] = useState<string>('')
  const [selectedShip, setSelectedShip] = useState<Record<string, any>>({})
  const [spaceshipsInfo, setSpaceshipsInfo] = useState<Array<Record<string, any>>>([])

  const queryPurchasePriceOfShipsCallback = useCallback(async () => {
    setIsLoading(true)
    const response = await queryPurchasePriceOfShips()
    setSpaceshipsInfo(response)
    setIsLoading(false)
  }, [queryPurchasePriceOfShips])

  const handleSpaceshipEv = (ship: Record<string, any>) => {
    setSelectedShip(ship)
    setModalStatus('ship')
    // console.log(setSelectedShip)
    // history.push('/m/coming-soon')
  }

  const handlePurchaseEv = useCallback(async () => {
    if (library && account) {
      const { seat } = selectedShip
      setModalStatus('confirming')
      const response = await purchaseAspacecraft(library, account, seat, 1)
      if (response) setModalStatus('succeed')
      else setModalStatus('fail')
    }
  }, [account, library, purchaseAspacecraft, selectedShip])

  const Spaceships = useMemo(() => {
    if (isLoading) return (<C.MLoading show section/>)
    if (isEmpty(spaceshipsInfo) && !isLoading) return (<NoCards />)
    return (
      <div className="web-buy-spaceship-content">
        {
          spaceshipsInfo.map((ship) => {
            return (
              <div className="web-buy-spaceship-content-box" key={ship.seat}>
                <ShipCard seat={ship.seat} />
                <C.WebButton size='small' type='blue' onClick={() => handleSpaceshipEv(ship)}>Buy</C.WebButton>
              </div>
            )
          })
        }
      </div>
    )
  }, [isLoading, spaceshipsInfo])

  useEffect(() => {
    void queryPurchasePriceOfShipsCallback()
  }, [queryPurchasePriceOfShipsCallback])

  return (
    <div className='web-buy-spaceship'>
      <C.WebTitle title='Buy Spaceship'/>
      { Spaceships }
      <C.WebModal show={modalStatus === 'ship'} onClose={() => setModalStatus('')} size="large">
        <div className="web-buy-spaceship-modal">
          <h2>Buy a {selectedShip?.seat}-seater spaceship</h2>
          <ShipCard seat={selectedShip?.seat} />
          <em>{securityInterception(selectedShip?.price ?? 0, 3)} <small>BP</small></em>
          <p>WALLET BALANCE: <span>{securityInterception(balance, 3)} BP</span></p>
          <C.WebButton type="blue" onClick={handlePurchaseEv}>Confirm</C.WebButton>
        </div>
      </C.WebModal>

      <C.McpStatusWaitModal show={modalStatus === 'confirming'}/>
      <C.McpStatusFailModal show={modalStatus === 'fail'} onClose={() => setModalStatus('')}/>
      <C.McpStatusSuccModal show={modalStatus === 'succeed'} onClose={() => {
        setModalStatus('')
        history.push('/spaceship')
      }}/>
    </div>
  )
}

export default BuyShip
