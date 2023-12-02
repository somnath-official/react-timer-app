import { useState } from 'react'
import { getDurationFromSeconds } from '../../utils/time'
import './Timer.css'
import PlaySvg from '../../assets/play.svg'
import PauseSvg from '../../assets/pause.svg'
import ResetSvg from '../../assets/reset.svg'

interface PropType {
	timeToRune: number
}

const Timer = ({ timeToRune }: PropType) => {
	const [time, setTime] = useState(0)
	const [timeId, setTimerId] = useState<number|null>(null)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [shouldReset, setShouldReset] = useState<boolean>(false)

	async function startTimer() {
		if (timeId) {
			clearInterval(timeId)
		}

		const t = setInterval(() => {
			setTime((prev) => {
				if (prev < timeToRune) {
					return prev + 1 
				} else {
					setShouldReset(true)
					setIsPlaying(false)
					return prev
				}
			})
		}, 1000)

		setIsPlaying(true)
		setTimerId(t)
	}

	async function pauseTimer() {
		if (timeId) {
			clearInterval(timeId)
		}
		setIsPlaying(false)
	}

	async function resetTimer() {
		await pauseTimer()
		setTime(0)
		setShouldReset(false)
		await startTimer()
	}

	function getTimerControllers() {
		if (isPlaying && !shouldReset) return <img src={PauseSvg} className='paly-btn btn' onClick={pauseTimer}/>
		else if (!isPlaying && !shouldReset) return <img src={PlaySvg} className='paly-btn btn' onClick={startTimer}/>
		else if (shouldReset) return <img src={ResetSvg} className='paly-btn btn' onClick={resetTimer}/>
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