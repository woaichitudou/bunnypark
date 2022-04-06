import React, { FC, useState } from 'react'
import classnames from 'classnames'
import { connectorLocalStorageKey } from '@/utils/web3React'
import { useCopyToClipboard } from 'react-use'
import C from '@/components'

interface Props {
  show: boolean
  account: string
  logout: () => void
  onClose?: () => void
}

const Components: FC<Props> = ({ show, account, logout, onClose = () => { } }) => {
  const handleLogout = (): void => {
    logout()
    window.localStorage.removeItem(connectorLocalStorageKey)
    window.location.reload()
    onClose()
  }
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const [, copyToClipboard] = useCopyToClipboard()

  return (
    <C.WebModal className={classnames('account-modal')} title="Your wallet" show={show} onClose={onClose}>
      <div className='account-modal-title'>
        {account}
      </div>
      <div className='account-modal-content'>
        <a href={`https://bscscan.com/address/${account}`} target="_blank" rel="noreferrer">
          View on BscScan
        </a>
        <div className='account-modal-content-copy' onClick={() => {
          copyToClipboard(account)
          setIsTooltipDisplayed(true)
          setTimeout(() => {
            setIsTooltipDisplayed(false)
          }, 1000)
        }}>
          Copy Address
          {isTooltipDisplayed
            ? <div className='account-modal-content-copy-btn'>Copied</div>
            : null
          }
        </div>
      </div>
      <div className="account-modal-btn">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </C.WebModal>
  )
}

export default Components

export const auto = {
  name: 'WebWalletAccountModal',
  Components
}
