import { useSelector } from 'react-redux'
import './App.css'
import Timer from './components/timer/Timer'
import { RootState } from './store'
import TimerAction from './components/timerAction/TimerAction'

function App() {
  const timerData = useSelector((state: RootState) => state.timer)

  return (
    <>
      <div className='timer-container'>
        {
          timerData.timers.length
          ? timerData.timers.map((timer) => {
              return <Timer timeToRune={timer.seconds} key={timer.id}/>
            })
          : <div className='no-timer-created'>No timer created</div>
        }
      </div>
      <TimerAction />
    </>
  )
}

export default App
