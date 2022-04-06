import React, { FC, useMemo, useState, useCallback } from 'react'
import { RE_WALLET_ADDRESS } from '@/config'
import { useAppDispatch } from '@/state'
import { setShareMessage } from '@/state/share'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import Store from '@/class/Shop'

import C from '@/components'
import BunnyCard from '../../components/Card/BunnyCard'

interface Porps {
  cardInfo: Record<string, any>
  show?: boolean
  onClose?: () => void
  onClick?: () => void
}

export const Components: FC<Porps> = ({ cardInfo, show = false, onClose, onClick }) => {
  const { types, levelPower, tokenId, kind } = cardInfo
  const [address, setAddress] = useState<string>('')
  const [status, setStatus] = useState('')
  const { fetchSendCard } = Store
  const dispatch = useAppDispatch()
  const { account, library } = useActiveWeb3React()

  const handleInput = (event: any) => setAddress(event.target.value)

  const handleSend = useCallback(async () => {
    setStatus('Waiting')
    const tx = await fetchSendCard(library as any, account as string, address, tokenId)
    if (tx) {
      setStatus('Success')
      dispatch(setShareMessage(tx))
    } else setStatus('Failure')
  }, [account, address, dispatch, fetchSendCard, library, tokenId])

  const handleClose = () => {
    setStatus('')
    onClose?.()
  }
  const isCanSend = useMemo(() => {
    // eslint-disable-next-line no-restricted-globals
    return RE_WALLET_ADDRESS.test(address)
  }, [address])
  return (
    <C.WebModal show={show} onClose={onClose} size="large">
      <div className="m-send-card">
        <div className="m-send-card-box">
          <BunnyCard level={levelPower} tokenId={tokenId} rank={types} kind={kind} rear={Boolean(false)}/>
        </div>
        <input type="text" className="m-send-card-input" onChange={handleInput} placeholder='Please enter wallet address' />
        <C.Button disabled={!isCanSend} type='blue' onClick={handleSend}>Send</C.Button>
      </div>
      <C.McpStatusWaitModal show={status === 'Waiting'} onClose={handleClose} />
      <C.McpStatusSuccModal show={status === 'Success'} onClose={handleClose} />
      <C.McpStatusFailModal show={status === 'Failure'} onClose={handleClose} />
    </C.WebModal>
  )
}

export default Components
export const auto = {
  name: 'BunnySendCard',
  Components
}
