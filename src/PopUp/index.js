import { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { FaPlus } from "react-icons/fa6"
import { v4 as uuidv4 } from 'uuid'
import './index.css'

const PopUp = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [priority, setPriority] = useState('low')
const [status, setStatus] = useState('todo')
const [deadline, setDeadline] = useState('')

const handleSubmit = (close) => {
  if (title === '' || deadline === '') return

  onAddTask({ id: uuidv4(), title, description, priority, status, deadline })

  
  setTitle('')
  setDescription('')
  setPriority('low')
  setStatus('todo')
  setDeadline('')

  close()
}

  return (
    <Popup
      trigger={
        <button className='login-button'>
          <FaPlus className='icons'/> Add Task
        </button>
      }
      modal
      nested
      
    >
      {close => (
        <div className='modal-container'>
          <div className='modal-header'>
            <h2 className='modal-title'>Add New Task</h2>
            <button className='modal-close' onClick={close}>X</button>
          </div>

          <label className='modal-label'>TASK TITLE</label>
          <input
            className='modal-input'
            type='text'
            placeholder='UI/UX Course Complete'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className='modal-label'>DESCRIPTION</label>
          <textarea
            className='modal-textarea'
            placeholder='Enter description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className='modal-row'>
            <div className='modal-half'>
              <label className='modal-label'>PRIORITY</label>
              <select
                className='modal-select'
                value={priority}
                 onChange={(e) => setPriority(e.target.value)}
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
            <div className='modal-half'>
              <label className='modal-label'>STATUS</label>
              <select
                className='modal-select'
                value={status}
                  onChange={(e) => setStatus(e.target.value)}
              >
                <option value='todo'>To Do</option>
                <option value='inprogress'>In Progress</option>
                <option value='done'>Done</option>
              </select>
            </div>
          </div>

          <label className='modal-label'>DEADLINE</label>
          <input
            className='modal-input'
            type='date'
            value={deadline}
             onChange={(e) => setDeadline(e.target.value)}
          />

          <div className='modal-buttons'>
            <button className='cancel-button' onClick={close}>Cancel</button>
            <button className='create-button' onClick={() => handleSubmit(close)}>Create Task</button>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default PopUp