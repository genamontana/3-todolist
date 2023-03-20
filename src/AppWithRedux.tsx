import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import AddItemForm from './AddItemForm';
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

    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatch(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(id, newTitle, todoListId)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const action = ChangeTodoListFilterAC(todoListId, value)
        dispatch(action)
    }

    function removeTodoList(id: string) {
        const action = RemoveTodoListAC(id)
        dispatch(action)
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const action = ChangeTodoListTitleAC(id, newTitle)
        dispatch(action)
    }

    function addTodoLists(title: string) {
        const action = AddTodoListAC(title)
        dispatch(action)
    }


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
                            let allTodoListTasks = tasks[tl.id]
                            let tasksForTodolist = allTodoListTasks
                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodoListTasks.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodoListTasks.filter(t => t.isDone)
                            }
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
