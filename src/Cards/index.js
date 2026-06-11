import './index.css'

const colors = [
  "#FF6B6B", "#4ECDC4", "#FFD93D", "#6C5CE7",
  "#00B894", "#E17055", "#0984E3", "#A29BFE"
];




const Cards = props => {
    const {eachDetails, onChangeStatus, onDeleteTask, onClickCard  } = props

    const {
  id,
  title,
  description,
  priority,
  status,
  deadline,
} = eachDetails;
const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const handleStatusChange = (e) => {
    onChangeStatus(id, e.target.value)
  }


    const getLevelClass = (priority) => {
  switch (priority.toUpperCase()) {
    case "LOW":
      return "low-level";

    case "MEDIUM":
      return "medium-level";

    case "HIGH":
      return "high-level";

  }
};

const monthName = new Date(deadline).toLocaleString("default", {
  month: "long",
});

const levelClass = getLevelClass(priority);
    return (
        <>
            <div className='task-card-container' style={{ borderLeft: `6px solid ${randomColor}`}} onClick={() => onClickCard(eachDetails)}>
                <div className={levelClass}>
                    <p className='texts'>{priority.toUpperCase()} </p>
                </div>
                <p className='task-name'>{title} </p>
                <p className='task-description'>{description} </p>
                <p className='deadline'>{monthName} <span className='date'>{deadline} </span> </p>
                <hr/>
                <div className='card-bottom-container'>
                <select 
                    className='status-select'
                    value={status} 
                    onChange={handleStatusChange}
                    onClick={(e) => e.stopPropagation()}
                >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <button className='delete-button' onClick={(e) => {
                        e.stopPropagation()  
                        onDeleteTask(id)
                    }}>
                    Delete
                </button>
                </div>
            </div>
        </>
    )
}

export default Cards