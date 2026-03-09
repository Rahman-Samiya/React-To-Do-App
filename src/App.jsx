import { useState } from 'react'

function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskText.trim() === '') return
    onAddTask(taskText)
    setTaskText('')
  }

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <button 
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  )
}

function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet. Add one above!</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

function FilterButtons({ currentFilter, onFilterChange }) {
  const filters = ['All', 'Completed', 'Pending']
  
  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter}
          className={currentFilter === filter ? 'active' : ''}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    }
    setTasks([...tasks, newTask])
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed
    if (filter === 'Pending') return !task.completed
    return true
  })

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length

  return (
    <div className="app">
      <header>
        <h1>My To-Do List</h1>
        <p className="stats">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </header>
      
      <TaskInput onAddTask={addTask} />
      
      <FilterButtons 
        currentFilter={filter} 
        onFilterChange={handleFilterChange} 
      />
      
      <TaskList 
        tasks={filteredTasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App
