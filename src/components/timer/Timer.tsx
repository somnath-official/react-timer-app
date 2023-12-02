import './Timer.css'

interface PropType {
	timeToRune: number
}

const Timer = ({ timeToRune }: PropType) => {
	return (
		<div className='timer-block'>
			<div className='time-display'>{timeToRune}</div>
		</div>
	)
}

export default Timer