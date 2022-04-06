import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Pilot, PilotState } from '@/state/types'

const initialState: PilotState = {
  data: {
    tokenId: undefined,
    status: false,
    type: '',
    buff: 0,
    name: ''
  }
}

export const PilotSlice = createSlice({
  name: 'Pilot',
  initialState,
  reducers: {
    setSelectedPilot: (state, action: PayloadAction<Pilot>) => {
      state.data = { ...action.payload }
    },
    delSelectedPilot: (state) => {
      state.data = {
        tokenId: undefined,
        status: false,
        type: '',
        buff: 0,
        name: ''
      }
    }
  }
})

// Actions
export const { setSelectedPilot, delSelectedPilot } = PilotSlice.actions

export default PilotSlice.reducer
