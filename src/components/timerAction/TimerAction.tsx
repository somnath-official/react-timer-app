import { useDispatch, useSelector } from 'react-redux'
import './TimerAction.css'
import { RootState } from '../../store'
import { pauseAllTimer, resetAllTimer, startAlltimer } from '../../store/features/timerSlice'

const TimerAction = () => {
  const timerData = useSelector((state: RootState) => state.timer)
  const dispatch = useDispatch()

  return (
    <div className='timer-action-container'>
      <button
        className='btn btn-success'
      >
        Add New
      </button>
      <button
        className='btn btn-primary'
        disabled={!timerData.timers.length}
        onClick={() => dispatch(startAlltimer())}
      >
        Start All
      </button>
      <button
        className='btn btn-secondary'
        disabled={!timerData.timers.length}
        onClick={() => dispatch(pauseAllTimer())}
      >
        Pause All
      </button>
      <button
        className='btn btn-dark'
        disabled={!timerData.timers.length}
        onClick={() => dispatch(resetAllTimer(true))}
      >
        Reset All
      </button>
      <button
        className='btn btn-danger'
        disabled={!timerData.timers.length}
      >
        Delete All
      </button>
    </div>
  )
}

export default TimerAction