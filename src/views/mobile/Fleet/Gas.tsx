import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import C from '@/components'
import BigNumber from 'bignumber.js'
import Adventure from '@/class/Adventure'
import useTokenBalance from '@/hooks/useTokenBalance'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import { securityInterception } from '@/utils/formatBalance'
import { getBGAddress, getBPAddress, getUSDTAddress } from '@/config/common/addressHelpers'

export const paymentData = [
  {
    name: 'USDT & BG',
    key: 'BG',
    value: 1
  }, {
    name: 'USDT & BP',
    key: 'BP',
    value: 2
  }]

const Gas: FC = () => {
  const dayData = [40, 20, 10]
  const history = useHistory()
  const { library, account } = useActiveWeb3React()
  const balanceBP = useTokenBalance(getBPAddress())
  const balanceBG = useTokenBalance(getBGAddress())
  const balanceUSD = useTokenBalance(getUSDTAddress())
  const { fleetId } = useParams<Record<string, any>>()
  const { todoBuyFuelByDays, calcIncreaseFuelPaidByDays } = Adventure

  const [day, setDay] = useState(40)
  const [payment, setPayment] = useState('BG')
  const [gasPrice, setGasPrice] = useState<Record<string, any>>()
  const [modalStatus, setModalStatus] = useState<string>('')

  const calcIncreaseFuelPaidByDaysCallback = useCallback(async (library) => {
    const find = paymentData.find((p) => p.key === payment)
    const response = await calcIncreaseFuelPaidByDays(library, fleetId, day, find?.value ?? 1)
    if (!isEmpty(response)) {
      const { payAmount, usdAmount } = response
      setGasPrice({
        payAmount: securityInterception((payAmount ?? 0) as any, 3),
        usdAmount: securityInterception((usdAmount ?? 0) as any, 3)
      })
    }
  }, [calcIncreaseFuelPaidByDays, day, fleetId, payment])

  const handlePurchaseEv = useCallback(async () => {
    if (library && account) {
      setModalStatus('confirming')
      const _payment = paymentData.find((p) => p.key === payment)
      const response = await todoBuyFuelByDays(library, account, fleetId, day, _payment?.value ?? 1)
      if (response) {
        setModalStatus('succeed')
      } else {
        setModalStatus('fail')
      }
    }
  }, [library, account, todoBuyFuelByDays, fleetId, day, payment])

  const isDisabled = useMemo(() => {
    const _balanceBG = new BigNumber(balanceBG)
    const _balanceBP = new BigNumber(balanceBP)
    const _balanceUSD = new BigNumber(balanceUSD)
    const _usdAmount = new BigNumber(gasPrice?.usdAmount ?? 0)
    const _payAmount = new BigNumber(gasPrice?.payAmount ?? 0)
    return ((payment === 'BP' ? _balanceBP : _balanceBG).isLessThan(_payAmount)) || (_balanceUSD.isLessThan(_usdAmount))
  }, [balanceBG, balanceBP, balanceUSD, gasPrice, payment])

  const currencyBalance = useMemo(() => ([securityInterception(balanceUSD, 3), securityInterception((payment === 'BP' ? balanceBP : balanceBG), 3)]), [balanceBG, balanceBP, balanceUSD, payment])

  useEffect(() => {
    if (library) {
      void calcIncreaseFuelPaidByDaysCallback(library)
    }
  }, [calcIncreaseFuelPaidByDaysCallback, day, payment, library])

  return (
    <div className='m-gas'>
      <C.BackButton backUrl="/m/fleet" />
      <C.Title title='Buy fuel' />
      <C.WebImage src='fleet/refuel.png' />
      <div className="m-gas-day">
        <p>Select the number of days you want to buy</p>
        <div className="m-gas-day-box">
          {dayData.map((item, index) => {
            return (<div key={index}
              className={classnames('m-gas-day-box-min', { 'm-gas-day-box-min-active': item === day }, { 'm-gas-day-box-min-hot-20': item === 20 }, { 'm-gas-day-box-min-hot-40': item === 40 })}
              onClick={() => {
                setDay(item)
              }}>{item} days</div>)
          })}
        </div>
      </div>
      <p className="m-gas-choose-label">Choose payment method</p>
      <div className="m-gas-payment-box">
        {paymentData.map((item, index) => {
          return (<div key={index}
            className={classnames('m-gas-payment-box-min', { 'm-gas-payment-box-min-active': item.key === payment })}
            onClick={() => {
              setPayment(item.key)
            }}>{item.name}</div>)
        })}
      </div>
      <div className="m-gas-btn">
        <C.Button type='yellow' onClick={() => setModalStatus('gas')}>Pay Now</C.Button>
      </div>

      <C.ConfirmPayModal
        disabled={isDisabled}
        currencySymbol={payment}
        onClick={handlePurchaseEv}
        show={modalStatus === 'gas'}
        price={gasPrice}
        currencyBalance={currencyBalance}
        onClose={() => setModalStatus('')} />
      <C.McpStatusWaitModal show={modalStatus === 'confirming'} />
      <C.McpStatusFailModal show={modalStatus === 'fail'} onClose={() => setModalStatus('')} />
      <C.McpStatusSuccModal show={modalStatus === 'succeed'} onClose={() => history.push('/m/fleet')} />
    </div>
  )
}

export default Gas
