import { getDurationFromSeconds } from '../../utils/time'
import './Timer.css'
import PlaySvg from '../../assets/play.svg'
import PauseSvg from '../../assets/pause.svg'
import ResetSvg from '../../assets/reset.svg'
import { useDispatch, useSelector } from 'react-redux'
import { pauseTimer, resetAllTimer, startTimer } from '../../store/features/timerSlice'
import { useEffect, useState } from 'react'
import { RootState } from '../../store'

interface PropType {
	id: number
  secondsToRun: number
  isRunning: boolean
}

const Timer = ({ id, secondsToRun, isRunning }: PropType) => {
	const [time, setTime] = useState(0)
	const dispatch = useDispatch()
	const shouldReset = useSelector((state: RootState) => state.timer.resetTimer)
	
	useEffect(() => {
		if (shouldReset) {
			setTime(0)
			dispatch(resetAllTimer(false))
		}

		const timerId = setInterval(() => {
			if (isRunning) {
				setTime((prevValue) => {
					if (prevValue < secondsToRun) return prevValue + 1
					else return prevValue
				})
			}
		}, 1000)

		return () => {
      clearInterval(timerId)
    };
	}, [dispatch, isRunning, secondsToRun, shouldReset])

	const resetTimer = () => {
		setTime(0)
		dispatch(startTimer(id))
	}

	function getTimerControllers() {
		if (isRunning && time < secondsToRun)
			return <img src={PauseSvg} className='paly-btn btn' onClick={() => dispatch(pauseTimer(id))}/>
		else if (!isRunning && time < secondsToRun)
			return <img src={PlaySvg} className='paly-btn btn' onClick={() => dispatch(startTimer(id))}/>
		else if (time >= secondsToRun)
			return <img src={ResetSvg} className='paly-btn btn' onClick={resetTimer}/>
	}

	return (
		<div className='timer-block'>
			<div className='time-display'>{getDurationFromSeconds(time)}</div>
			<div className='timer-controller-holder'>
				{
					getTimerControllers()
				}
			</div>
		</div>
	)
}

export default Timer