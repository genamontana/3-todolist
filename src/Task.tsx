import {TaskType} from './AppWithRedux';
import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import {Delete} from '@mui/icons-material';

type TaskPropsType = {
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    task: TaskType,
    todoListId: string
}


export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId)

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todoListId)
    }
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])

    return (
        <li className={props.task.isDone ? 'is-done' : ''}>

            <Checkbox color="primary"
                      checked={props.task.isDone}
                      onChange={onChangeStatusHandler}/>
            <EditableSpan value={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})