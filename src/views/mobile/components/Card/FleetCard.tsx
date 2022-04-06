import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
// import { useHistory } from 'react-router-dom'
import C from '@/components'
import Toast from '@/utils/Toast'
import { getBpUrl } from '@/config/env'
import { useBlock } from '@/state/block/hooks'

const cardsData: Record<string, Record<string, any>> = {
  small: {
    img: 'cards/fleet-1.png',
    name: 'Small Fleet'
  },
  medium: {
    img: 'cards/fleet-2.png',
    name: 'Medium Fleet'
  },
  large: {
    img: 'cards/fleet-3.png',
    name: 'Large Fleet'
  },
  super: {
    img: 'cards/fleet-4.png',
    name: 'Super Fleet'
  }
}

const CardRear: FC<any> = ({ onClose, isSalable, handleSend, handleDetail, handleBuyFuel }) => {
  // const history = useHistory()
  const goSend = () => {
    handleSend()
    onClose()
  }
  const goDetail = () => {
    handleDetail()
    onClose()
  }
  const goBuyFuel = () => {
    handleBuyFuel()
    onClose()
  }
  const handleSell = () => {
    if (isSalable) {
      const url = getBpUrl('market/sell/fleet')
      window.open(url, '_self')
      // history.push('/m/coming-soon')
    } else {
      // The fleet is resting
      Toast.fail('The fleet is resting')
    }
    onClose()
  }
  return (
    <div className="m-c-card-fleetcard-rear">
      <p>
        <span onClick={goSend}>Send</span>
        <i onClick={goDetail}>Detail</i>
        <em onClick={handleSell}>Sell</em>
      </p>
      <button onClick={goBuyFuel}>Buy fuel</button>
      <div className="m-c-card-fleetcard-rear-mask" onClick={onClose} />
    </div>
  )
}

const ShipCard: FC<any> = ({
  type = '',
  tokenId = 'MX105',
  oil = 4000,
  power = 100,
  luck = '0',
  status = '', // rest oilless
  rear = true,
  lastBlock = 0,
  onClick = () => null,
  handleSend = () => null,
  handleDetail = () => null,
  handleBuyFuel = () => null,
  getInfo = () => null
}) => {
  const card = cardsData[type]
  const [showRear, setShowRear] = useState(false)
  const [cutDownTime, setCutDownTime] = useState(0)

  const { currentBlock } = useBlock()

  useEffect(() => {
    if (status === 'rest') {
      const time = lastBlock - currentBlock
      if (time === 0) {
        getInfo()
      }
      setCutDownTime(time < 0 ? 0 : time)
    }
  }, [currentBlock, lastBlock, status, getInfo])

  const goShowRear = () => {
    if (rear) setShowRear(true)
    else onClick()
  }
  if (card == null) return null
  return (
    <div className={classNames('m-c-card-fleetcard', `${status ? `m-c-card-fleetcard-status-${status}` : ''}`)}>
      {
        !showRear
          ? (<>
            <label onClick={goShowRear} />
            {
              status === 'rest' && <div className='m-c-card-fleetcard-time'><C.WebImage src='fleet/sleep-clock.png' /><span>{cutDownTime}</span></div>
            }
            <div className="m-c-card-fleetcard-inset" onClick={goShowRear}>
              <div className="m-c-card-fleetcard-image">
                <C.WebImage src={card.img} />
              </div>
              <h4>{card.name}</h4>
              <ul className="m-c-card-fleetcard-info">
                <li>{tokenId}</li>
                <li>{oil}</li>
                <li>{power}</li>
                <li>{luck}%</li>
              </ul>
            </div>
          </>
          )
          : <CardRear
            isSalable={!(status === 'rest')}
            handleSend={handleSend}
            handleDetail={handleDetail}
            handleBuyFuel={handleBuyFuel}
            onClose={() => setShowRear(false)} />
      }
    </div>
  )
}

export default ShipCard
