import { useSelector } from 'react-redux'
import './TimerAction.css'
import { RootState } from '../../store'

const TimerAction = () => {
  const timerData = useSelector((state: RootState) => state.timer)

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
      >
        Start All
      </button>
      <button
        className='btn btn-secondary'
        disabled={!timerData.timers.length}
      >
        Pause All
      </button>
      <button
        className='btn btn-dark'
        disabled={!timerData.timers.length}
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