import { useLocation, useHistory } from 'react-router-dom'
import './index.css'

import { FaPlus } from "react-icons/fa6";

const TaskDetails = () => {
  const location = useLocation()
  const history = useHistory()
  const task = location.state.taskDetails

  const { title, description, priority, status, deadline } = task

  const getLevelClass = (priority) => {
    switch (priority.toUpperCase()) {
      case "LOW": return "low-level";
      case "MEDIUM": return "medium-level";
      case "HIGH": return "high-level";
      default: return "";
    }
  }

  const levelClass = getLevelClass(priority)

  const formattedDeadline = new Date(deadline).toLocaleDateString("default", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })

  const getStatusLabel = (status) => {
    switch(status) {
      case "todo": return "To Do";
      case "inprogress": return "In Progress";
      case "done": return "Done";
      default: return status;
    }
  }

  const onLogout = () => {
    localStorage.removeItem('jwt_token')
    history.replace('/login') 
  }

  return (
    <div className='task-details-bg'>
      <div className='task-details-left'>
        <div className='logo-container'>
          <img 
            src='https://img.magnific.com/premium-vector/task-paper-with-checklist-cartoon-vector-icon-illustration-education-business-isolated-flat-vector_138676-10728.jpg?w=826' 
            alt='logo' 
            className='dashboard-logo'
          />
          <p className='dashboard-heading'>Task Manager</p>
          <p className='dahsboard-descr'>Project Dashboard</p>
        </div>
        <div className='logout-container'>
                    <button className='login-button'><FaPlus className='icons'/> Add Task</button>
                    <button className='logout-button' onClick={onLogout}>Log out</button>
                  </div>
      </div>

      <div className='task-details-right'>
        <button className='back-button' onClick={() => history.push('/dashboard')}>
          ← Back to board
        </button>

        <div className={levelClass} style={{display: 'inline-block', marginBottom: '12px'}}>
          <p className='texts'>{priority.toUpperCase()}</p>
        </div>

        <h1 className='task-details-title'>{title}</h1>

        <div className='task-info-card'>
          <div className='info-row'>
            <p className='info-label'>Status</p>
            <p className='info-value'>{getStatusLabel(status)}</p>
          </div>
          <hr className='info-hr'/>
          <div className='info-row'>
            <p className='info-label'>Deadline</p>
            <p className='info-value'>{formattedDeadline}</p>
          </div>
        </div>

        <div className='description-card'>
          <p className='description-label'>DESCRIPTION</p>
          <p className='description-text'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails