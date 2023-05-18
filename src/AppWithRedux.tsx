import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback((id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback(
        (id: string, newTitle: string, todoListId: string) => {
            const action = changeTaskTitleAC(id, newTitle, todoListId)
            dispatch(action)
        }, [dispatch])

    const changeFilter = useCallback(
        (value: FilterValuesType, todoListId: string) => {
            const action = ChangeTodoListFilterAC(todoListId, value)
            dispatch(action)
        }, [dispatch])

    const removeTodoList = useCallback(
        (id: string) => {
            const action = RemoveTodoListAC(id)
            dispatch(action)
        }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        const action = ChangeTodoListTitleAC(id, newTitle)
        dispatch(action)
    }, [dispatch])

    const addTodoLists = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }, [])


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                                color="inherit"
                                aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h5">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoLists}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodolist = tasks[tl.id]

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={tl.filter}
                                              removeTodoList={removeTodoList}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodoListTitle={changeTodoListTitle}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>


            </Container>
        </div>
    );
}

export default AppWithRedux;
