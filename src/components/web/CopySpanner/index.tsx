import React, { FC } from 'react'
import { copyText } from '@/utils/tools'
import Toast from '@/utils/Toast'
interface Props {
  tokenId: number | string
}
const CopySpanner: FC<Props> = ({ tokenId }) => {
  const copy = async (e: any) => {
    e.stopPropagation()
    await copyText(String(tokenId))
    Toast.success('Copy success')
  }
  return (
    <div className="web-copy-spanner" onClick={copy}>
      {tokenId}
    </div>
  )
}

export default CopySpanner

export const auto = {
  name: 'WebCopySpanner',
  Components: CopySpanner
}
