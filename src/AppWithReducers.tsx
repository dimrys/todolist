import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeFilterTodoListAC,
    ChangeTitleTodoListAC, FilterValueType,
    RemoveTodoListAC,
    todoListReducer
} from "./reducers/tl-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./reducers/tasks-reducer";
import {AddItemForm} from "./AddIItemForm";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function  AppWithReducers () {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, dispatchToTodolist] = useReducer(todoListReducer,[
        {id: todoListId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todoListId2, title: "What to buy", filter: "all", addedDate: '', order: 0},
    ])

    const [tasks, dispatchToTask] = useReducer(taskReducer, {
        [todoListId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todoListId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New, todoListId: todoListId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            ],
            [todoListId2]: [
                {
                    id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todoListId2, description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                },
                {
                    id: v1(), title: "Bread", status: TaskStatuses.New, todoListId: todoListId2, description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                },
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
    function changStatus(taskID: string, status: TaskStatuses, todoListId:string) {
        const action = changeTaskStatusAC(taskID, status,todoListId)
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
                                taskForToDoList = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                            }
                            if(tl.filter === "completed"){
                                taskForToDoList = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
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


