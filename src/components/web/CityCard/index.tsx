import React, { FC } from 'react'
import C from '@/components'

interface Porps {
  cityName: string // 城市名称
  onClick?: () => void
  power: format // 战力
  ticket: format // 机票
  successRate: format // 成功率
  earnings: format // 收益
  btnName?: string // 按钮名称
  disabled?: false
}

interface format {
  number: string //  值
  weight: string | number // 权重 对应进度条百分比
}

export const Components: FC<Porps> = ({ disabled = false, cityName, power, ticket, successRate, earnings, onClick, btnName = 'Adventure' }) => {
  const rep = (string: string) => {
    return string === null || '' || undefined ? 'DUBAI' : string.replace(/\s/g, '')
  }
  return (
    <div className='web-city-card'>
      <div className="web-city-card-title">{cityName}</div>
      <div className="web-city-card-box">
        <div className="web-city-card-box-min">
          <C.WebImage src={`adventure/${rep(cityName)}.png`} />
          <ul>
            <li>
              <C.WebImage src='adventure/icon-3.png' />
              <span>Combat power</span>
              <label>{power.number} <small>MP</small></label>
              <div className="web-progress-bar">
                {power.weight === 0 ? null : <div className="web-progress-bar-above" style={{ width: power.weight }}></div>}
                <div className="web-progress-bar-following"></div>
              </div>
            </li>
            <li>
              <C.WebImage src='adventure/icon-2.png' />
              <span>Air ticket</span>
              <label>{ticket.number} <small>$ (BG)</small></label>
              <div className="web-progress-bar">
                {ticket.weight === 0 ? null : <div className="web-progress-bar-above" style={{ width: ticket.weight }}></div>}
                <div className="web-progress-bar-following"></div>
              </div>
            </li>
            <li>
              <C.WebImage src='adventure/icon-4.png' />
              <span>Base rate of success</span>
              <label>{successRate.number}  <small>%</small></label>
              <div className="web-progress-bar">
                {successRate.weight === 0 ? null : <div className="web-progress-bar-above" style={{ width: successRate.weight }}></div>}
                <div className="web-progress-bar-following"></div>
              </div>
            </li>
            <li>
              <C.WebImage src='adventure/icon-1.png' />
              <span>Estimated returns</span>
              <label>{earnings.number}  <small>$</small></label>
              <div className="web-progress-bar">
                {earnings.weight === 0 ? null : <div className="web-progress-bar-above" style={{ width: earnings.weight }}></div>}
                <div className="web-progress-bar-following"></div>
              </div>
            </li>
          </ul>
          <C.WebButton type='yellow' disabled={disabled} onClick={onClick}>{btnName}</C.WebButton>
        </div>
      </div>
    </div>

  )
}

export default Components
export const auto = {
  name: 'WebCityCard',
  Components
}
