import classnames from 'classnames'
import BigNumber from 'bignumber.js'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import Adventure from '@/class/Adventure'
import useTokenBalance from '@/hooks/useTokenBalance'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import { getBGAddress } from '@/config/common/addressHelpers'
import { securityInterception } from '@/utils/formatBalance'

interface Porps {
  show?: boolean
  onClose?: () => void
  entranceFee?: Record<string, any>
  onClick?: (payment: string) => void
}

export const paymentData = [
  {
    name: 'Wallet payment',
    key: 'BG',
    value: 2
  }, {
    name: 'Unclaimed rewards',
    key: '$',
    value: 1
  }]

export const Components: FC<Porps> = ({ show = false, onClose, onClick, entranceFee }) => {
  const { queryVirtualAccountInfo } = Adventure
  const balance = useTokenBalance(getBGAddress())
  const { library, account } = useActiveWeb3React()

  const [payment, setPayment] = useState('BG')
  const [virtualInfo, setvirtualInfo] = useState<Record<string, any> | null>(null)

  const queryVirtualAccountInfoCallback = useCallback(async (library, account) => {
    const response = await queryVirtualAccountInfo(library, account)
    if (response) setvirtualInfo(response)
  }, [queryVirtualAccountInfo])

  const switchBalance = useMemo(() => (payment === '$' ? (virtualInfo?.totalAmount ?? 0) : balance), [balance, payment, virtualInfo?.totalAmount])

  const isDisabled = useMemo(() => {
    const _balance = payment === '$' ? (virtualInfo?.totalAmount ?? 0) : balance
    const _fee = payment === '$' ? (entranceFee?.number ?? 0) : (entranceFee?.bgAmount ?? 0)
    return (new BigNumber(_balance).isLessThan(new BigNumber(_fee)))
  }, [balance, entranceFee?.bgAmount, entranceFee?.number, payment, virtualInfo?.totalAmount])

  useEffect(() => {
    if (library && account) {
      void queryVirtualAccountInfoCallback(library, account)
    }
  }, [account, library, queryVirtualAccountInfoCallback])

  return (
    <C.WebModal show={show} onClose={onClose} size="large">
      <div className="m-pay-tickets-modal">
        <div className="m-pay-tickets-modal-title">Air Ticket</div>
        <C.WebImage src='adventure/icon-5.png' />
        <p>
          {securityInterception(entranceFee?.bgAmount ?? 0, 3)} BG<br />
          ≈ {securityInterception(entranceFee?.number ?? 0, 3)} USDT
        </p>
        <div className="m-pay-tickets-payment">
          <p>Select payment method</p>
          <div className="m-pay-tickets-payment-box">
            {paymentData.map((item, index) => {
              return (<div key={index}
                className={classnames('m-pay-tickets-payment-box-min', { 'm-pay-tickets-payment-box-min-active': item.key === payment })}
                onClick={() => {
                  setPayment(item.key)
                }}>{item.name}</div>)
            })}
          </div>
        </div>
        <div className="m-pay-tickets-modal-total">
          Wallet Balance:<label>{securityInterception(switchBalance ?? 0, 3)}</label> {payment}
        </div>
        <C.Button type='blue' disabled={isDisabled} onClick={() => onClick?.(payment)}>Confirm</C.Button>
      </div>
    </C.WebModal>
  )
}

export default Components
export const auto = {
  name: 'PayTicketsModal',
  Components
}
