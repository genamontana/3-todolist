import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(idTask: string) {
        let filteredTasks = tasks.filter(t => t.id !== idTask)
        setTasks(filteredTasks)
    }

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    function changeTaskStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}/>
        </div>
    );
}

export default App;
