import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ShareMessageState } from '@/state/types'

const initialState: ShareMessageState = {
  shareMessage: ''
}

export const ShareMessageSlice = createSlice({
  name: 'ShareMessage',
  initialState,
  reducers: {
    setShareMessage: (state, action: PayloadAction<string>) => {
      state.shareMessage = action.payload
    },
    clearShareMessage: (state) => {
      state.shareMessage = ''
    }
  }
})

// Actions
export const { setShareMessage, clearShareMessage } = ShareMessageSlice.actions

export default ShareMessageSlice.reducer
