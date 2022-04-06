import React, { FC } from 'react'
import C from '@/components'
// import ShipCard from '../components/Card/ShipCard'

const Details: FC = () => {
  return (
    <div className='m-details'>
      <C.BackButton />
      <C.Title title='Details'></C.Title>
      <div className="m-details-label">
        <div className="m-details-label-left">
          <C.WebImage src='adventure/icon-3.png' />
          <span>1582</span>
          <div className="m-details-label-border">
            <em></em>
          </div>
          <label>Combat power</label>
        </div>
        <div className="m-details-label-right">
          <C.WebImage src='adventure/icon-4.png' />
          <span>1582</span>
          <div className="m-details-label-border">
            <em></em>
          </div>
          <label>success rate</label>
        </div>
      </div>
      <C.Title title='passenger compartment' type='min'></C.Title>
      <div className="m-details-content">
        <div className="m-details-content-box">这放卡片组件</div>
        <div className="m-details-content-box">这放卡片组件</div>
        <div className="m-details-content-box">这放卡片组件</div>
        <div className="m-details-content-box">这放卡片组件</div>
      </div>
    </div>
  )
}

export default Details
