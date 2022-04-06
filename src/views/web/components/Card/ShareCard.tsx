import classNames from 'classnames'
import React, { FC } from 'react'
import Numeral from 'numeral'

import C from '@/components'
// share 卡样式临时模拟 待修改 TODO
const BunnyCard: FC<any> = ({
  size = 'mini',
  card
}) => {
  const { buff, name, type, tokenId } = card
  return (
    <div className={classNames('web-c-card-babycard', `web-c-card-size-${size}`)}>
      <div className="web-c-card-inset">
        <div className="web-c-card-inset-front">
          <div className="web-c-card-image">
            <C.WebImage src={`cards/share-${type}.png`} />
          </div>
          <div className="web-c-card-info">
            <h4>{name}</h4>
            <span>#{Numeral(tokenId).format('00000')}</span>
            {buff >= 0 ? <label>{buff}%</label> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BunnyCard
