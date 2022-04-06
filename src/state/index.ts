import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import shareReducer from './share'
import blockReducer from './block'
import fleetReducer from './fleet'
import pilotReducer from './pilot'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
    shareMessage: shareReducer,
    fleetMember: fleetReducer,
    pilot: pilotReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
