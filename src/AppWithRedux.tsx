import React, {useCallback} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {AddTodoListAC, ChangeFilterTodoListAC, ChangeTitleTodoListAC, RemoveTodoListAC} from "./reducers/tl-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./AddIItemForm";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: Array<TasksType>
}
export type FilterValueType = 'all' | 'active' | 'completed'

function  AppWithRedux () {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>( state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>( state => state.tasks)
    const dispatch = useDispatch()

    // const todoListId1 = v1()
    // const todoListId2 = v1()
    //
    // const [todoLists, dispatchToTodolist] = useReducer(todoListReducer,[
    //     {id: todoListId1, title: "What to learn", filter: "all" },
    //     {id: todoListId2, title: "What to buy", filter: "all" },
    // ])
    //
    // const [tasks, dispatchToTask] = useReducer(taskReducer, {
    //     [todoListId1]: [
    //             {id: v1(), title: "HTML&CSS", isDone: true},
    //             {id: v1(), title: "JS", isDone: false},
    //             {id: v1(), title: "ReactJS", isDone: true},
    //             {id: v1(), title: "Redax", isDone: true},
    //         ],
    //         [todoListId2]: [
    //             {id: v1(), title: "Milk", isDone: true},
    //             {id: v1(), title: "Bread", isDone: false},
    //             {id: v1(), title: "Beer", isDone: true},
    //             {id: v1(), title: "Meat", isDone: true},
    //         ]
    // } )


    const changeTaskTitle = useCallback((taskID: string, title: string, todoListId:string) => {
        const action = changeTaskTitleAC(taskID, title, todoListId)
        dispatch(action)
    }, [dispatch])

    const removeTasks = useCallback((taskID: string, todoListId:string ) => {
        const action = removeTaskAC(taskID, todoListId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((tasTitle: string, todoListId:string) => {                        //функция добавления элементов списка
        const action = addTaskAC(tasTitle, todoListId)
        dispatch(action)
    }, [dispatch])

    const changStatus = useCallback((taskID: string, isDone: boolean, todoListId:string) => {
        const action = changeTaskStatusAC(taskID, isDone,todoListId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((newFilterValue: FilterValueType, todoListId:string) => {
        const action = ChangeFilterTodoListAC(todoListId, newFilterValue)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((totoListID: string) => {
        const action = RemoveTodoListAC(totoListID)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((totoListID: string, newTitle: string) => {
        const action = ChangeTitleTodoListAC(totoListID, newTitle)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])





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

export default AppWithRedux;


