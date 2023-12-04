import { getDurationFromSeconds } from '../../utils/time'
import './Timer.css'
import PlaySvg from '../../assets/play.svg'
import PauseSvg from '../../assets/pause.svg'
import ResetSvg from '../../assets/reset.svg'
import DeleteSvg from '../../assets/delete.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTimer, pauseTimer, resetAllTimer, startTimer } from '../../store/features/timerSlice'
import { useEffect, useState } from 'react'
import { RootState } from '../../store'

interface PropType {
	id: number
  secondsToRun: number
  isRunning: boolean
	startDelay: number
}

const Timer = ({ id, secondsToRun, startDelay, isRunning }: PropType) => {
	const [time, setTime] = useState(0)
	const dispatch = useDispatch()
	const shouldReset = useSelector((state: RootState) => state.timer.resetTimer)
	const [deg, setDeg] = useState('0deg')
	
	useEffect(() => {
		// console.log(startDelay)
		if (shouldReset) {
			setTime(0)
			setDeg(`0deg`)
			dispatch(resetAllTimer(false))
		}

		let timeIntervalId: number | null = null
		let setTimeOutId: number | null = null

		if (startDelay) setTimeOutId = setTimeout(trackTime, startDelay * 1000)
		else trackTime()

		function trackTime() {
			timeIntervalId = setInterval(() => {
				if (isRunning) {
					setTime((prevValue) => {
						let updatedTime
						if (prevValue < secondsToRun) updatedTime = prevValue + 1
						else updatedTime = prevValue
						const r = (updatedTime / secondsToRun) * 360
						setDeg(`${r}deg`)
						return updatedTime
					})
				}
			}, 1000)
		}

		return () => {
			if (timeIntervalId) clearInterval(timeIntervalId)
			if (setTimeOutId) clearTimeout(setTimeOutId)
    };
	}, [dispatch, isRunning, secondsToRun, shouldReset, startDelay])

	const resetTimer = () => {
		setTime(0)
		dispatch(startTimer(id))
	}

	function getTimerControllers() {
		if (isRunning && time < secondsToRun)
			return (
				<>
					<img src={PauseSvg} className='paly-btn btn' onClick={() => dispatch(pauseTimer(id))}/>
					<img src={DeleteSvg} className='paly-btn btn' onClick={() => dispatch(deleteTimer(id))}/>
				</>
			)
		else if (!isRunning && time < secondsToRun)
			return (
				<>
					<img src={PlaySvg} className='paly-btn btn' onClick={() => dispatch(startTimer(id))}/>
					<img src={DeleteSvg} className='paly-btn btn' onClick={() => dispatch(deleteTimer(id))}/>
				</>
			)
		else if (time >= secondsToRun)
			return (
				<>
					<img src={ResetSvg} className='paly-btn btn' onClick={resetTimer}/>
					<img src={DeleteSvg} className='paly-btn btn' onClick={() => dispatch(deleteTimer(id))}/>
				</>
			)
	}

	return (
		<div className='timer-block'>
			<div className='time-display'>{getDurationFromSeconds(time)}</div>
			<div
				className='timer-progress-bar'
				style={{
					backgroundImage: `conic-gradient(#69e9d7 ${deg}, #201f1f ${deg})`
				}}
			></div>
			<div className='timer-controller-holder'>{ getTimerControllers() }</div>
		</div>
	)
}

export default Timer