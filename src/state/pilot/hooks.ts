import { useSelector } from 'react-redux'

import { Pilot, State } from '@/state/types'

// 机队驾驶员选择临时数据
export const useSelectedPilot = (): Pilot => {
  return useSelector((state: State) => state.pilot.data)
}
