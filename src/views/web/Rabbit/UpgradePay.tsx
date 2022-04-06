import React, { FC, useState, useCallback, useEffect } from 'react'
import C from '@/components'
import classnames from 'classnames'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import Store from '@/class/Shop'
import { useRouteMatch, useHistory } from 'react-router-dom'
import useTokenBalance from '@/hooks/useTokenBalance'
import { securityInterception } from '@/utils/formatBalance'
import { getBGAddress, getUSDTAddress, getBPAddress } from '@/config/common/addressHelpers'

export const paymentData = [
  {
    name: 'USDT&BG',
    key: 'USDT&BG',
    value: 1
  }, {
    name: 'USDT&BP',
    key: 'USDT&BP',
    value: 2
  }]

const UpgradeChoose: FC = () => {
  const { fetchUpgradePayAmount, fetchUpgradeCardLevel } = Store
  const { account, library } = useActiveWeb3React()
  const { params } = useRouteMatch()
  const history = useHistory()
  const [payWay, setPayWay] = useState(1)
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState('')
  const [usdtAmount, setUsdtAmount] = useState(0)
  const [payAmount, setPayAmount] = useState(0)
  // const [total, setTotal] = useState(0)
  const tokenId = (params as any)?.tokenId
  const level = Number((params as any)?.level)
  const quantity = Number((params as any)?.quantity)

  const BGBalance = securityInterception(useTokenBalance(getBGAddress()), 3)
  const USDTBalance = securityInterception(useTokenBalance(getUSDTAddress()), 3)
  const BPBalance = securityInterception(useTokenBalance(getBPAddress()), 3)

  const handleUpgrade = useCallback(async () => { // 升级
    setStatus('Waiting')
    try {
      await fetchUpgradeCardLevel(account as string, library as any, tokenId, level + quantity, payWay)
      await setStatus('')
      await setShow(false)
      history.push(`/bunny/upgrade/succeed/${tokenId}`)
    } catch (e) {
      setStatus('Failure')
    }
  }, [fetchUpgradeCardLevel, account, library, level, history, payWay, quantity, tokenId])

  const getUpdaterPrice = useCallback(async () => {
    setUsdtAmount(0)
    setPayAmount(0)
    const res = await fetchUpgradePayAmount(payWay)
    setUsdtAmount(securityInterception((res.usdAmount * quantity), 3))
    setPayAmount(securityInterception((res.payAmount * quantity), 3))
  }, [fetchUpgradePayAmount, payWay, quantity])

  useEffect(() => {
    if (account) void getUpdaterPrice().then()
  }, [account, getUpdaterPrice])
  const handleClose = () => {
    setStatus('')
  }

  return (
    <div className='web-rabbit-upgrade-choose'>
      {/* <C.BackButton /> */}
      <C.WebTitle title='Upgrade Combat Power' />
      <p className='web-rabbit-upgrade-choose-title'>Choose payment method</p>
      <div className="web-gas-payment-box web-rabbit-upgrade-choose-box">
        {paymentData.map((item, index) => {
          return (<div key={index}
            className={classnames('web-gas-payment-box-min', { 'web-gas-payment-box-min-active': item.value === payWay })} onClick={() => setPayWay(item.value)}>{item.name}</div>)
        })}
      </div>
      <p className='web-rabbit-upgrade-choose-label'>Upgrade {quantity}  level{quantity > 1 ? 's' : ''} with <span>{usdtAmount}</span> USDT and <span>{payAmount}</span> {payWay === 1 ? 'BG' : 'BP'}.</p>
      <div className="web-rabbit-upgrade-choose-balance">
        <p><label>Wallet Balance: </label><span><em>{USDTBalance}</em>USDT</span></p>
        {
          payWay === 1 && <p><label>Wallet Balance: </label><span><em>{BGBalance}</em>BG</span></p>
        }
        {
          payWay === 2 && <p><label>Wallet Balance: </label><span><em>{BPBalance}</em>BP</span></p>
        }
      </div>
      <div className="web-rabbit-upgrade-choose-btn">
        <C.WebButton disabled={!usdtAmount} onClick={() => { setShow(true) }}>Upgrade</C.WebButton>
      </div>
      <C.WebUpgradePayModal onClick={handleUpgrade} show={show} onClose={() => { setShow(false) }} usdtAmount={usdtAmount} usdtBalance={USDTBalance} currencyAmount={payAmount} currencySymbol={payWay === 1 ? 'BG' : 'BP'} currencyBalance={payWay === 1 ? BGBalance : BPBalance}></C.WebUpgradePayModal>
      <C.McpStatusWaitModal show={status === 'Waiting'} onClose={handleClose}/>
      <C.McpStatusSuccModal show={status === 'Success'} onClose={handleClose}/>
      <C.McpStatusFailModal show={status === 'Fail'} onClose={handleClose}/>
    </div>
  )
}

export default UpgradeChoose
