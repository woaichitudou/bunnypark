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
    <div className={classNames('m-c-card-babycard', `m-c-card-size-${size}`)}>
      <div className="m-c-card-inset">
        <div className="m-c-card-inset-front">
          <div className="m-c-card-image">
            <C.WebImage src={`cards/share-${type}.png`} />
          </div>
          <div className="m-c-card-info">
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
