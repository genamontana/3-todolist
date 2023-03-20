import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from './Todolist';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

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

function AppWithReducers() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchToTask] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId)
        dispatchToTask(action)
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId)
        dispatchToTask(action)
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatchToTask(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(id, newTitle, todoListId)
        dispatchToTask(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const action = ChangeTodoListFilterAC(todoListId, value)
        dispatchToTodoList(action)
    }

    function removeTodoList(id: string) {
        const action = RemoveTodoListAC(id)
        dispatchToTodoList(action)
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const action = ChangeTodoListTitleAC(id, newTitle)
        dispatchToTodoList(action)
    }

    function addTodoLists(title: string) {
        const action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTask(action)
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
                            return <Grid item>
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

export default AppWithReducers;
