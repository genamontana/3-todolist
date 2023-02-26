import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';


type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: string
    removeTodoList: (id: string) => void
}


export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>

                {
                    props.tasks.map((t) => {

                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeHandler}
                                />
                                <EditableSpan title={t.title}/>
                                <button onClick={onClickHandler}>
                            </button>
                    </li>
                    )
                    })

                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}