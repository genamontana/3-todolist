import React from 'react';
import './App.css';
import {Todolist} from './Todolist';


function App() {

    let tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ]

    function removeTask(idTask: number) {
         tasks1 = tasks1.filter(t => t.id !== idTask)
        console.log(tasks1)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasks1}
            removeTask={removeTask}/>
        </div>
    );
}

export default App;
