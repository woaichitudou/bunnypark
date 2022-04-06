import React, { FC, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import { getBpUrl } from '@/config/env'

enum cardsData {
  'Adventure No. 1' = 2,
  'Adventure No. 2' = 4,
  'Adventure No. 3' = 6,
  'Adventure No. 4' = 8,
}

const FleetCard: FC<any> = ({ seat = 2, handleSend = () => null, flips }) => { // flips 卡片翻转就需要传flips部分地方不需要翻转所以多加了参数
  // const history = useHistory()
  const [showRear, setShowRear] = useState(false)
  const goSend = () => {
    handleSend()
    onClose()
  }
  const onSell = () => {
    const url = getBpUrl('market/sell/spaceship')
    window.open(url, '_self')
    // history.push('/m/coming-soon')
    onClose()
  }
  const onClose = () => {
    setShowRear(false)
  }
  const onFlip = () => {
    if (flips) setShowRear(true)
  }

  const name = cardsData[seat]
  if (name == null) return null
  return (<div className='web-c-card-shipcard-box'>
    {!showRear ? <div onClick={() => { onFlip() }} className={classNames('web-c-card-shipcard', `web-c-card-shipcard-seat-${seat}`)}>
      <h4>{name}</h4>
    </div> : <div className='web-c-card-shipcard-box-rear' onClick={() => { onClose() }}>
      <i onClick={goSend}>Send</i>
      <em onClick={onSell}>Sell</em>
    </div>
    }
  </div>
  )
}

export default FleetCard
