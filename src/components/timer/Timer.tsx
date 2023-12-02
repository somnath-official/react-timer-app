import { useState } from 'react'
import { getDurationFromSeconds } from '../../utils/time'
import './Timer.css'
import PlaySvg from '../../assets/play.svg'
import PauseSvg from '../../assets/pause.svg'

interface PropType {
	timeToRune: number
}

const Timer = ({ timeToRune }: PropType) => {
	const [time, setTime] = useState(0)
	const [timeId, setTimerId] = useState<number|null>(null)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)

	function startTimer() {
		if (timeId) {
			clearInterval(timeId)
		}

		const t = setInterval(() => {
			setTime((prev) => {
				if (prev < timeToRune) {
					return prev + 1 
				} else {
					setIsPlaying(false)
					return prev
				}
			})
		}, 1000)

		setIsPlaying(true)
		setTimerId(t)
	}

	function pauseTimer() {
		if (timeId) {
			clearInterval(timeId)
		}
		setIsPlaying(false)
	}

	return (
		<div className='timer-block'>
			<div className='time-display'>{getDurationFromSeconds(time)}</div>
			<div className='timer-controller-holder'>
				{
					isPlaying
						? <img
								src={PauseSvg}
								className='paly-btn btn'
								onClick={pauseTimer}
							/>
						: <img
								src={PlaySvg}
								className='pause-btn btn'
								onClick={startTimer}
							/>
				}
			</div>
		</div>
	)
}

export default Timer