import './TimerAction.css'

const TimerAction = () => {
  return (
    <div className='timer-action-container'>
      <button className='btn btn-success'>Add New</button>
      <button className='btn btn-primary'>Start All</button>
      <button className='btn btn-secondary'>Pause All</button>
      <button className='btn btn-dark' disabled>Reset All</button>
      <button className='btn btn-danger'>Delete All</button>
    </div>
  )
}

export default TimerAction