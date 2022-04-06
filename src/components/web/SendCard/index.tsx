import React, { FC, useMemo, useState } from 'react'

import C from '@/components'
import { isAddress } from '@/config/common/signerContract'
import ShipCard from '@/views/web/components/Card/ShipCard'
import FleetCard from '@/views/web/components/Card/FleetCard'

interface Porps {
  show?: boolean
  cardType?: string
  onClose?: () => void
  onClick?: (p?: string) => void
  cardInfo: Record<any, any>
}

export const Components: FC<Porps> = ({ show = false, cardInfo, cardType, onClose, onClick }) => {
  const [address, setAddress] = useState<string>('')

  const handleChangeEv = (event: any) => setAddress(event.target.value)

  const isDisabled = useMemo(() => (!isAddress(address)), [address])

  return (
    <C.WebModal show={show} onClose={onClose} size="large">
      <div className="web-send-card">
        <div className="web-send-card-box">
          {
            cardType === 'fleet' ? (
              <FleetCard
                rear={false}
                oil={cardInfo.gas ?? 0}
                luck={(cardInfo.buff ?? 0) / 10}
                type={cardInfo.type}
                power={cardInfo.power ?? 0}
                tokenId={cardInfo.tokenId}
                size='min'
              />
            ) : (
              <ShipCard seat={cardInfo.seat} />
            )
          }
        </div>
        <input type="text" className="m-send-card-input" onChange={handleChangeEv} placeholder='Please enter wallet address' />
        <C.WebButton type='blue' disabled={isDisabled} onClick={() => onClick?.(address)}>Send</C.WebButton>
      </div>
    </C.WebModal>
  )
}

export default Components
export const auto = {
  name: 'WebSendCard',
  Components
}
