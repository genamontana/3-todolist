import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (idTask: number) => void
}


export function Todolist(props: TodolistPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>

                {
                    props.tasks.map((t) => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={()=>props.removeTask(t.id)}>
                                </button>
                            </li>
                        )
                    })

                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}