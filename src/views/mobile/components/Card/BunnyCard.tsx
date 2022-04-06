import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import C from '@/components'
import { times } from 'lodash'
import { cardsMatchs, cardPower } from '@/class/const'
import { getBpUrl } from '@/config/env'

const CardLevel: FC<any> = ({ maxLevel, level }) => {
  const tempArr = times(maxLevel, i => i < level)
  return (
    <div className="m-c-card-level">
      <span>{level * 100}</span>
      {
        tempArr.map((item, index) => <em key={index} className={classNames({ active: item })} />)
      }
    </div>
  )
}

const CardRear: FC<any> = ({ tokenId, onClose, handleSend, isUpgrade, type }) => {
  const history = useHistory()
  const handleUpgrade = () => {
    history.push(`/m/bunny/upgrade/${tokenId}`)
    // history.push('/m/coming-soon')
    onClose()
  }
  const Send = () => {
    handleSend()
    onClose()
  }
  const handleSell = () => {
    const key = type === 'baby' ? 'BabyBunny' : 'Adventure'
    const url = getBpUrl(`market/sell/${key}`)
    console.log(url)
    window.open(url, '_self')
    // history.push('/m/coming-soon')
    onClose()
  }
  return (
    <div className="m-c-card-inset-rear">
      <p>
        <span onClick={Send}>Send</span>
        <em onClick={handleSell}>Sell</em>
      </p>
      {
        isUpgrade && <button onClick={handleUpgrade}>Upgrade power</button>
      }
      <div className="m-c-card-inset-rear-mask" onClick={onClose} />
    </div>
  )
}

const BunnyCard: FC<any> = ({
  size = 'mini',
  level = 1,
  tokenId = '',
  kind = 0,
  rank = 'SR',
  rear = true,
  onClick = () => null,
  handleSend = () => null
}) => {
  rank = String(rank).toLocaleLowerCase()
  const type = rank === 'baby' ? 'baby' : 'bunny'
  const [showRear, setShowRear] = useState(false)

  const goShowRear = () => {
    if (rear && size === 'mini') setShowRear(true)
    else onClick()
  }

  if (type === 'bunny') {
    const types = rank.toLocaleUpperCase()
    const cardInfo = {
      maxLevel: cardPower[types],
      name: cardsMatchs[types][kind],
      img: `cards/bunny-${rank}-${Number(kind) + 1}.png`
    }
    // 不显示算力按钮
    const isUpgrade = level < cardInfo?.maxLevel && rank !== 'baby'
    if (cardInfo == null) return null
    return (
      <div className={classNames('m-c-card-bunnycard', `m-c-card-size-${size}`)}>
        <div className="m-c-card-inset">
          {
            !showRear
              ? (
                <div className="m-c-card-inset-front" onClick={goShowRear}>
                  <div className="m-c-card-image">
                    <C.WebImage src={cardInfo.img} />
                  </div>
                  <div className={classNames('m-c-card-info', `m-c-card-info-${rank}`)}>
                    <h4>{cardInfo.name}</h4>
                    <C.MCopySpanner tokenId={tokenId} />
                  </div>
                  {
                    cardInfo.maxLevel > 0 && <CardLevel maxLevel={cardInfo.maxLevel} level={level}/>
                  }
                </div>
              )
              : <CardRear type={type} isUpgrade={isUpgrade} tokenId={tokenId} handleSend={handleSend} onClose={() => setShowRear(false)} />
          }
        </div>
      </div>
    )
  }
  if (type === 'baby') {
    return (
      <div className={classNames('m-c-card-babycard', `m-c-card-size-${size}`)}>
        <div className="m-c-card-inset">
          {
            !showRear
              ? (
                <div className="m-c-card-inset-front" onClick={goShowRear}>
                  <div className="m-c-card-image">
                    <C.WebImage src="cards/bunny-baby.png" />
                  </div>
                  <div className="m-c-card-info">
                    <h4>BabyBunny</h4>
                    <div className="m-c-card-info-luck">0.5%</div>
                  </div>
                </div>
              )
              : <CardRear type={type} tokenId={tokenId} handleSend={handleSend} onClose={() => setShowRear(false)} />
          }
        </div>
      </div>
    )
  }
  return null
}

export default BunnyCard
