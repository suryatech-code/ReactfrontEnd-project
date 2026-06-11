import Cards from '../Cards'
import {useState} from 'react'
import { useHistory } from 'react-router-dom' 
import './index.css'
import { FaPlus } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";

import PopUp from '../PopUp'

const allTask = [
    {id: 2, title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play. Run timed ideation rounds, capture every idea without judgement, then cluster themes and vote on directions. Document assumptions, risks, and dependencies so the team can align on scope before detailed planning begins.", priority: 'low', status: 'todo', deadline: '2024-12-05'},
    {id: 1, title: 'Research', description: 'User research helps you to create an optimal product for users. Plan interviews and contextual inquiry, synthesise findings into personas and journey maps, and translate insights into measurable problems. Share a concise readout with design and engineering so decisions stay grounded in evidence.', priority: 'high', status: 'todo', deadline: '2024-12-06'},
    {id: 3, title: 'Wireframes', description: 'Low fidelity wireframes include the most basic content and visuals. Map primary flows, empty states, and error paths at grayscale fidelity before polishing UI. Annotate interactions and data requirements so developers can estimate effort and spot edge cases early in the lifecycle.', priority: 'high', status: 'todo', deadline: '2024-12-05'},
    {id: 4, title: 'Onboarding Illustrations', description: 'Create engaging illustrations for the onboarding flow. Establish a consistent character style, export assets for light and dark themes, and coordinate with copy for pacing across screens. Deliver SVG or PNG sets with a simple usage guide for engineers implementing animations.', priority: 'low', status: 'inprogress', deadline: '2024-12-05'},
    {id: 5, title: 'Moodboard', description: 'Build a visual moodboard for the new design direction. Collect typography, colour, photography, and spatial references that express the brand tone. Present rationale for each cluster and capture stakeholder feedback in a single source of truth the team can revisit during visual design.', priority: 'low', status: 'inprogress', deadline: '2024-12-06'},
    {id: 6, title: 'Mobile App Design', description: 'Design the complete mobile app screens. Cover navigation patterns, accessibility targets, and responsive breakpoints. Hand off redlines, component specs, and prototype links so QA can validate flows against acceptance criteria before release candidates go to the store.', priority: 'medium', status: 'done', deadline: '2024-12-06'},
    {id: 7, title: 'Design System', description: 'It just needs to adapt the UI from what you did before. Audit existing components, define tokens for spacing and colour, and publish documentation with live examples. Set governance for contributions and versioning so product teams can ship consistently without reinventing patterns each sprint.', priority: 'medium', status: 'done', deadline: '2024-12-06'}
]

const Dashboard = props => {

  const [priority, setPriority] = useState("ALL");
  const [TasksList, setTasksList] = useState(allTask)

  const history = useHistory()  

  const onClickCard = (task) => {
    history.push(`/task/${task.id}`, { taskDetails: task }) 
  }

  const handleChange = (e) => {
    setPriority(e.target.value);
  };

  const onAddTask = (task) => {
  setTasksList(prev => [...prev, task])
}

  const filteredTasks = priority === "ALL"
    ? TasksList
    : TasksList.filter(each => each.priority === priority.toLowerCase());

  const toDoTasks = filteredTasks.filter(each => each.status === 'todo')
  const inProgressTasks = filteredTasks.filter(each => each.status === 'inprogress')
  const doneTasks = filteredTasks.filter(each => each.status === 'done')

  const onChangeStatus = (id, newStatus) => {
    setTasksList(prev =>
      prev.map(task => task.id === id ? { ...task, status: newStatus } : task)
    )
  }

  const onDeleteTask = (id) => {
    setTasksList(prev => prev.filter(task => task.id !== id))
  }

  const onLogout = () => {
    localStorage.removeItem('jwt_token')
    history.replace('/login') 
  }

  const noTaskRender = () => (
    <li className='no-task-container'>
      <p className='no-task'>No tasks here</p>
    </li>
  )

  return (
    <>
      <div className='dashboard-bg'>
        <div className='dashboard-left-container'>
          <div className='logo-container'>
            <button className='logo-naviagation'>
              <img src='https://img.magnific.com/premium-vector/task-paper-with-checklist-cartoon-vector-icon-illustration-education-business-isolated-flat-vector_138676-10728.jpg?w=826' alt='logo' className='dashboard-logo'/>
              <p className='dashboard-heading'>Task Manager</p>
              <p className='dahsboard-descr'>Project Dashboard</p>
            </button>
          </div>
          <div className='logout-container'>
            <PopUp onAddTask={onAddTask} />
            <button className='logout-button' onClick={onLogout}>Log out</button>
          </div>
        </div>
        <div className='dashboard-container'>
          <div className='priority-container'>
            <label className='label-element'>Filtered by priority</label>
            <select className='select-element' value={priority} onChange={handleChange}>
              <option className='options' value="ALL">All Priorities</option>
              <option className='options' value="HIGH">High</option>
              <option className='options' value="MEDIUM">Medium</option>
              <option className='options' value="LOW">Low</option>
            </select>
          </div>
          <div className='storage-container'>
            <div className='categories'>
              <div className='count-container'>
                <div className='icon-container'>
                  <FaTasks className='task-icon'/>
                  <p className='crt-condition'> To Do </p>
                </div>
                <p className='high-count'>{toDoTasks.length}</p>
              </div>
              <hr className='hr-line'/>
              <ul className='render-tasks'>
                {toDoTasks.length >= 1 ? toDoTasks.map(each =>
                  <Cards key={each.id} eachDetails={each} onDeleteTask={onDeleteTask} onChangeStatus={onChangeStatus} onClickCard={onClickCard} />
                ) : noTaskRender()}
              </ul>
            </div>
            <div className='categories'>
              <div className='count-container'>
                <div className='icon-container'>
                  <FaTasks className='task-icon'/>
                  <p className='crt-condition'> In Progress </p>
                </div>
                <p className='high-count'>{inProgressTasks.length}</p>
              </div>
              <hr className='hr-line'/>
              <ul className='render-tasks'>
                {inProgressTasks.length >= 1 ? inProgressTasks.map(each =>
                  <Cards key={each.id} eachDetails={each} onDeleteTask={onDeleteTask} onChangeStatus={onChangeStatus} onClickCard={onClickCard} />
                ) : noTaskRender()}
              </ul>
            </div>
            <div className='categories'>
              <div className='count-container'>
                <div className='icon-container'>
                  <FaTasks className='task-icon'/>
                  <p className='crt-condition'> Done </p>
                </div>
                <p className='high-count'>{doneTasks.length}</p>
              </div>
              <hr className='hr-line'/>
              <ul className='render-tasks'>
                {doneTasks.length >= 1 ? doneTasks.map(each =>
                  <Cards key={each.id} eachDetails={each} onDeleteTask={onDeleteTask} onChangeStatus={onChangeStatus} onClickCard={onClickCard} />
                ) : noTaskRender()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard