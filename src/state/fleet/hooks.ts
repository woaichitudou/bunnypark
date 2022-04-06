import { useSelector } from 'react-redux'

import { FleetMember, State } from '@/state/types'

// 创建机队临时数据，便于计算机对战力和冒险成功率
export const useSelectedFleetMember = (): FleetMember[] => {
  return useSelector((state: State) => state.fleetMember.data)
}
