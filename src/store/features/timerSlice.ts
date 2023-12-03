import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface TimerInterFace {
  id: number
  secondsToRun: number
  isRunning: boolean
}

export interface TimerStateInterFace {
  timers: TimerInterFace[]
  resetTimer: boolean
}

const initialState: TimerStateInterFace = 
{
  resetTimer: false,
  timers: [
    {id: 1, secondsToRun: 10, isRunning: false},
    {id: 2, secondsToRun: 38, isRunning: false},
    {id: 3, secondsToRun: 15, isRunning: false},
    {id: 4, secondsToRun: 20, isRunning: false},
    {id: 5, secondsToRun: 30, isRunning: false},
  ]
}

export const counterSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    createNewTimer: (state, action: PayloadAction<number>) => {
      state.timers.push({
        id: + new Date(),
        secondsToRun: action.payload,
        isRunning: false,
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