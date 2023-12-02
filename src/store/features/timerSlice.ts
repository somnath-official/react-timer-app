import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Timer {
  id: number
  seconds: number
}

export interface TimerState {
  startAll: boolean
  timers: Timer[]
}

const initialState: TimerState = 
{
  startAll: false,
  timers: []
}

export const counterSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    createNewTimer: (state, action: PayloadAction<number>) => {
      state.timers.push({id: + new Date(), seconds: action.payload })
    },
    deleteTimer: (state, action: PayloadAction<number>) => {
      state.timers = state.timers.filter((item) => item.id !== action.payload)
    },
    startAlltimer: (state) => {
      if (state.timers.length) state.startAll = true
    },
    pauseAllTimer: (state) => {
      if (state.startAll) state.startAll = false
    },
    deleteAllTimer: (state) => {
      state.startAll = false
      state.timers = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { createNewTimer, deleteTimer, startAlltimer } = counterSlice.actions

export default counterSlice.reducer