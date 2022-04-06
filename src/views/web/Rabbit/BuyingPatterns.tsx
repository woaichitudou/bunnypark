import React, { FC } from 'react'
import C from '@/components'
import { useHistory } from 'react-router-dom'

const BuyingPatterns: FC = () => {
  const history = useHistory()
  const handleDrivingModeEv = (mode: string) => {
    history.push(`/bunny/${mode}`)
  }
  return (
    <div className="web-drive-mode-bg">
      <div className='web-drive-mode'>
        <div className="web-drive-mode-box" >
          <C.WebImage src='new/icon-bg-1.png' onClick={() => handleDrivingModeEv('blind-box/buy')} />
          <span>Ordinary purchase</span>
        </div>
        <div className="web-drive-mode-box" >
          <C.WebImage src='new/icon-bg-2.png' onClick={() => handleDrivingModeEv('multiply/buy')} />
          <span>Reproduce</span>
        </div>
      </div>
    </div>
  )
}

export default BuyingPatterns
