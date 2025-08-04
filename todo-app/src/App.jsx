import React from "react";
import { useState } from "react";
import './App.css'


const App = () => {
  const [tasks, setTasks] = useState([
    {text: 'Clean the house ', completed: false},
    {text: 'Walk the dog', completed: false}
  ]);
  const [newTask, setNewTask] = useState("")

  
  const handleNewTasks = ( e ) => {
    setNewTask(e.target.value)
    
  }
  
  const addTask = () => {
    if ( newTask.trim() === ''){
      return 
    }
    setTasks(previousState => [...previousState, { text: newTask, completed: false}])
    setNewTask('')
  }
  
  const completeTask = (index) => {
          setTasks(prevState => {
            return prevState.map((task, i) => {
              return i === index ? { ...task, completed: !task.completed} : task
            })
          })
    }



  const deleteTask = ( index ) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);

    setTasks(updatedTasks);
  }

  const moveUp = (index ) => {
    if ( index > 0){
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index - 1] ] = 
    [updatedTasks[index - 1], updatedTasks[index] ]
    setTasks(updatedTasks)
    }
    
  }
  const moveDown = ( index ) => {
    if ( index < tasks.length - 1 ){
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = 
      [updatedTasks[index + 1], updatedTasks[index]]
      setTasks(updatedTasks)

    }
  }
  
  return (
    <div className="wrapper">
      <h1>To Do App</h1>
      <div className="task-input">
        <input type="text" name="task" value={ newTask } onChange={ handleNewTasks } onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTask();
                }
              }}/>
        <button onClick={ addTask }>Add</button>
      </div>
      <ul className="all-tasks">
        { tasks.map((task, index) => (
          <div className="single-task" key = { index }>
            <li className={task.completed ? 'completed-task' : ''}>{task.text}</li>
            <div className="emoji-wrapper">
              <button className="emojis" onClick={() => moveUp(index) } >⬆️</button>
              <button className="emojis" onClick={() => moveDown(index) } >⬇️</button>
              <button className="emojis"  onClick={ () => completeTask(index) }>✅</button>
              <button className="emojis" onClick={ () => deleteTask(index)}>❌</button>
            </div>
        </div>
        ))}
      </ul>
    </div>
  )
}

export default App;