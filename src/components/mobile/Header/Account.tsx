import React, { FC, memo, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey } from '@/utils/web3React'
import useAuth from '@/hooks/useAuth'
import { useCopyToClipboard } from 'react-use'
import Toast from 'light-toast'
import C from '@/components'
interface Props {
  onDismiss?: () => void
}

const Account: FC<Props> = ({ onDismiss }) => {
  const { account } = useWeb3React()

  const accountStr = String(account)
  const accountEllipsis = account != null ? `${accountStr.substring(0, 4)}...${accountStr.substring(accountStr.length - 4)}` : null
  const { logout } = useAuth()
  const handleLogout = (): void => {
    logout()
    window.localStorage.removeItem(connectorLocalStorageKey)
    onDismiss?.()
  }
  const [, copyToClipboard] = useCopyToClipboard()

  const copyAccountAddress = (): void => {
    copyToClipboard(accountStr)
    Toast.info('Copy Success', 1000)
  }
  useEffect(() => {
    if (account) {
      localStorage.setItem('userAccount', String(account))
    }
  }, [account])
  // const [isFarme] = useState(window.name === 'mobile')

  return (
    <div className="m-header-account">
      <div className="m-header-button">{accountEllipsis}</div>
      <div className="m-header-account-ctrl">
        <div className="m-header-account-ctrl-icon" onClick={copyAccountAddress}>
          <C.WebImage src="../../mobile/common/icon-m-copy.svg" />
        </div>
        <a className="m-header-account-ctrl-icon" href={`https://bscscan.com/address/${accountStr}`}>
          <C.WebImage src="../../mobile/common/icon-m-share.svg" />
        </a>
        <div className="m-header-account-ctrl-icon" onClick={handleLogout}>
          <C.WebImage src="../../mobile/common/icon-m-exit.svg" />
        </div>
      </div>
    </div>
  )
}

export default memo(Account)
