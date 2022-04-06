import { remove } from 'lodash'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FleetMember, FleetMemberState } from '@/state/types'

const initialState: FleetMemberState = {
  data: []
}

export const FleetSlice = createSlice({
  name: 'Fleet',
  initialState,
  reducers: {
    setSelectedFleetMember: (state, action: PayloadAction<FleetMember>) => {
      const { position } = action.payload
      const findIndex = state.data.findIndex((m) => m.position === position)

      if (findIndex > -1) {
        state.data = state.data.splice(findIndex, 1, action.payload)
      } else {
        state.data = [...state.data, action.payload]
      }
    },
    delSelectedFleetMember: (state, action: PayloadAction<FleetMember>) => {
      const { position } = action.payload
      remove(state.data, (m) => Number(m.position) === Number(position))
    },
    updateSelectedFleetMember: (state, action: PayloadAction<Omit<FleetMember, 'kind' | 'position' | 'type' | 'level'>>) => {
      const base = state.data
      const { tokenId } = action.payload
      const findIndex = base.findIndex((m) => Number(m.tokenId) === Number(tokenId))
      if (findIndex > -1) {
        state.data.splice(findIndex, 1, { ...base[findIndex], ...action.payload })
      }
    },
    clearSelectedFleetMember: (state) => {
      state.data = []
    }
  }
})

// Actions
export const { setSelectedFleetMember, delSelectedFleetMember, clearSelectedFleetMember, updateSelectedFleetMember } = FleetSlice.actions

export default FleetSlice.reducer
