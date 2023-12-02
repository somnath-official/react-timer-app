import './App.css'
import Timer from './components/timer/Timer'

function App() {
  return (
    <>
      <div className='timer-container'>
        <Timer timeToRune={30} />
        <Timer timeToRune={10} />
        <Timer timeToRune={15} />
        <Timer timeToRune={20} />
        <Timer timeToRune={20} />
        <Timer timeToRune={20} />
      </div>
      {/* <div className='timer-action-container'>
        <button onClick={() => setStartTimer(true)}>Start</button>
      </div> */}
    </>
  )
}

export default App
