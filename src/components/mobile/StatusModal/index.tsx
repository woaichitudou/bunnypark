import React, { FC, useState, useEffect } from 'react'
import { sleep } from '@/utils/tools'
import Wait from './wait'
import Succ from './succ'
import Fail from './fail'
interface Props {
  code: string
  succTip?: string
  waitTip?: string
  failTip?: string
}

const Components: FC<Props> = ({
  code = '',
  succTip = 'Succeed',
  waitTip = 'Waiting for Confirmation',
  failTip = 'Transaction Failed'
}) => {
  const [show, setShow] = useState(true)
  // 如果是成功或失败，增加3秒后自动关闭功能
  useEffect(() => {
    const init = async (): Promise<any> => {
      if (code === 'fail' || code === 'succ') {
        await sleep(3000)
        setShow(false)
      } else {
        setShow(true)
      }
    }
    void init()
  }, [code])
  if (show && code === 'wait') return <Wait tip={waitTip} show={show} />
  if (show && code === 'succ') return <Succ tip={succTip} show={show} onClose={() => setShow(false)} />
  if (show && code === 'fail') return <Fail tip={failTip} show={show} onClose={() => setShow(false)} />
  return null
}
export default Components

export const auto = {
  name: 'MStatus',
  Components
}
