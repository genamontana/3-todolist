import React, { useCallback} from 'react';
import {FilterValuesType, TaskType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';


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
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}


export const Todolist = React.memo((props: TodolistPropsType) => {

    const addTask = useCallback(
        (title: string) => {
            props.addTask(title, props.id)
        }, [props.addTask, props.id])



    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const onChangeTitleTodoListHandler = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }


    const onAllClickHandler = useCallback(
        () => props.changeFilter('all', props.id),
        [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(
        () => props.changeFilter('active', props.id),
        [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(
        () => props.changeFilter('completed', props.id),
        [props.changeFilter, props.id])


    let tasks = props.tasks

    if (props.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title}
                              onChange={onChangeTitleTodoListHandler}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>

                {
                    tasks.map(t => <Task key={t.id}
                                               removeTask={props.removeTask}
                                               changeTaskStatus={props.changeTaskStatus}
                                               changeTaskTitle={props.changeTaskTitle}
                                               task={t}
                                               todoListId={props.id}/>)
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color="inherit">All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color="primary">Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color="secondary">Completed
                </Button>
            </div>
        </div>
    )
})

