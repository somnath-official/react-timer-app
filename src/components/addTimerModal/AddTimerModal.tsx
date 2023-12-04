import { useEffect, useRef, useState } from 'react'
import './AddTimerModal.css'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { createNewTimer } from '../../store/features/timerSlice'

interface AddTimerModalProps {
  show: boolean
  toggleModal: (d: boolean) => void
}

const AddTimerModal = ({show, toggleModal}: AddTimerModalProps) => {
  const modalRef = useRef(null)
  const [seconds, setSeconds] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  })

  useEffect(() => {
    return () => {
      setSeconds(undefined)
    }
  }, [show])

  function addTimerData() {
    const s = Number(seconds)
    if (s === 0) {
      toast.warn('0 seconds not allowed')
      return
    }
    dispatch(createNewTimer(s))
    toast.success('Successfully added new timer')
    toggleModal(false)
  }

  return (
    show
    ? <div className="modal">
        <div className="modal-content" ref={modalRef}>
          <div className='modal-header'>
            <h3>Add new timer</h3>
          </div>
          <div className='modal-body'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <label className="custom-field transit">
                <input
                  type="number"
                  placeholder=" "
                  value={seconds}
                  onInput={(e) => {
                    setSeconds(e.target.value)
                  }}
                />
                <span className="placeholder">Enter time in seconds</span>
              </label>
              <div
                style={{
                  width: '100%',
                  marginLeft: '20px',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <button
                  className='btn btn-sm btn-success'
                  onClick={addTimerData}
                  disabled={!seconds}
                >
                  Add
                </button>
                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => toggleModal(false)}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    : ''
  )
}

export default AddTimerModal