import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import AddItemForm from "./AddIItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeFilterTodoListAC,
    ChangeTitleTodoListAC,
    RemoveTodoListAC,
    todoListReducer
} from "./reducers/tl-reducer";
import {userReducer} from "./state/user-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./reducers/tasks-reducer";

 export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: Array<TasksType>
}
export type FilterValueType = 'all' | 'active' | 'completed'

function  AppWithReducers () {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, dispatchToTodolist] = useReducer(todoListReducer,[
        {id: todoListId1, title: "What to learn", filter: "all" },
        {id: todoListId2, title: "What to buy", filter: "all" },
    ])

    const [tasks, dispatchToTask] = useReducer(taskReducer, {
        [todoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "ReactJS", isDone: true},
                {id: v1(), title: "Redax", isDone: true},
            ],
            [todoListId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: false},
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Meat", isDone: true},
            ]
    } )

    function changeTaskTitle(taskID: string, title: string, todoListId:string) {
        const action = changeTaskTitleAC(taskID, title, todoListId)
        dispatchToTask(action)
    }

    function removeTasks(taskID: string, todoListId:string ) {
        const action = removeTaskAC(taskID, todoListId)
        dispatchToTask(action)
    }
    function addTask(tasTitle: string, todoListId:string) {                        //функция добавления элементов списка
        const action = addTaskAC(tasTitle, todoListId)
        dispatchToTask(action)
    }
    function changStatus(taskID: string, isDone: boolean, todoListId:string) {
        const action = changeTaskStatusAC(taskID, isDone,todoListId)
        dispatchToTask(action)
    }



    function changeFilter(newFilterValue: FilterValueType, todoListId:string) {
       const action = ChangeFilterTodoListAC(todoListId, newFilterValue)
        dispatchToTodolist(action)

    }
    function removeTodoList(totoListID: string) {
        const action = RemoveTodoListAC(totoListID)
        dispatchToTodolist(action)
        dispatchToTask(action)

    }
    function changeTodoListTitle(totoListID: string, newTitle: string) {
       const action = ChangeTitleTodoListAC(totoListID, newTitle)
        dispatchToTodolist(action)
    }
    function addTodoList(title: string) {
       const action = AddTodoListAC(title)
       dispatchToTodolist(action)
       dispatchToTask(action)

    }




    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem ={addTodoList} />
                </Grid>
                <Grid container spacing={10}>
                    {
                        todoLists.map(tl => {
                            let taskForToDoList = tasks[tl.id]
                            if(tl.filter === "active"){
                                taskForToDoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if(tl.filter === "completed"){
                                taskForToDoList = tasks[tl.id].filter(t => t.isDone === true)
                            }

                            return (
                                <Grid item key = {tl.id}>
                                    <Paper elevation={10}  style={{padding: "10px"}}>
                                        <TodoList title={tl.title}
                                                  id = {tl.id}
                                                  tasks={taskForToDoList}
                                                  removeTasks={removeTasks}
                                                  changeFilter ={changeFilter}
                                                  addTask = {addTask}
                                                  changStatus = {changStatus}
                                                  filter = {tl.filter}
                                                  removeTodoList={removeTodoList}
                                                  changeTaskTitle = {changeTaskTitle}
                                                  changeTodoListTitle = {changeTodoListTitle}
                                        />
                                    </Paper>

                                </Grid>

                            )
                        })
                    }
                </Grid>
            </Container>


        </div>
    );
}

export default AppWithReducers;


