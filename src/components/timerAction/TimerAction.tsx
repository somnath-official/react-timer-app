import { useDispatch, useSelector } from 'react-redux'
import './TimerAction.css'
import { RootState } from '../../store'
import { deleteAllTimer, pauseAllTimer, resetAllTimer, startAlltimer } from '../../store/features/timerSlice'
import AddTimerModal from '../addTimerModal/AddTimerModal'
import { useState } from 'react'

const TimerAction = () => {
  const timerData = useSelector((state: RootState) => state.timer)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  function toggleModal() {
    setShowModal((prev) => !prev)
  }

  return (
    <>
      <div className='timer-action-container'>
        <button
          className='btn btn-success'
          onClick={toggleModal}
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
          onClick={() => dispatch(deleteAllTimer())}
        >
          Delete All
        </button>
      </div>

      <AddTimerModal show={showModal} toggleModal={toggleModal}/>
    </>
  )
}

export default TimerAction