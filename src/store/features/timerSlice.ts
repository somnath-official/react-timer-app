import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface TimerInterFace {
  id: number
  secondsToRun: number
  isRunning: boolean
  startDelay: number
}

export interface TimerStateInterFace {
  resetTimer: boolean
  longestTimerTime: number
  timers: TimerInterFace[]
}

const initialState: TimerStateInterFace = 
{
  resetTimer: false,
  longestTimerTime: 0,
  timers: [],
}

export const counterSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    createNewTimer: (state, action: PayloadAction<number>) => {
      if (action.payload > state.longestTimerTime) state.longestTimerTime = action.payload
      state.timers.push({
        id: + new Date(),
        secondsToRun: action.payload,
        isRunning: false,
        startDelay: 0,
      })
      state.timers.filter((item) => {
        item.startDelay = state.longestTimerTime - item.secondsToRun
      })
    },
    deleteTimer: (state, action: PayloadAction<number>) => {
      state.timers = state.timers.filter((item) => item.id !== action.payload)
    },
    startTimer: (state, action: PayloadAction<number>) => {
      state.timers.filter((item) => {
        if (item.id == action.payload)
          item.isRunning = true
      })
    },
    pauseTimer: (state, action: PayloadAction<number>) => {
      state.timers.filter((item) => {
        if (item.id == action.payload)
          item.isRunning = false
      })
    },
    startAlltimer: (state) => {
      if (state.timers.length)
        state.timers.filter((item) => item.isRunning = true)
    },
    pauseAllTimer: (state) => {
      if (state.timers.length)
        state.timers.filter((item) => item.isRunning = false)
    },
    resetAllTimer: (state, action: PayloadAction<boolean>) => {
      if (state.timers.length) state.resetTimer = action.payload
    },
    deleteAllTimer: (state) => {
      state.timers = []
      state.resetTimer = false
      state.longestTimerTime = 0
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  createNewTimer,
  deleteTimer,
  startTimer,
  pauseTimer,
  startAlltimer,
  pauseAllTimer,
  resetAllTimer,
  deleteAllTimer,
} = counterSlice.actions

export default counterSlice.reducer