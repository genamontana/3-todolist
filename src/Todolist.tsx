import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (idTask: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}


export function Todolist(props: TodolistPropsType) {

    let [title, setTitle] = useState<string>('')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>

                {
                    props.tasks.map((t) => {

                        const onClickHandler = () => props.removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeHandler}
                                />
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>
                                </button>
                            </li>
                        )
                    })

                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}