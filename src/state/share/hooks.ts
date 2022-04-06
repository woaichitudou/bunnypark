import { useSelector } from 'react-redux'

import { ShareMessageState, State } from '@/state/types'

// 消息共享
export const useShareMessage = (): ShareMessageState => {
  return useSelector((state: State) => state.shareMessage)
}
