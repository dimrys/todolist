import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    ChangeFilterTodoListAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistTC,
    TodoListDomainType
} from "./reducers/tl-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./AddIItemForm";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function  AppWithRedux () {

    useEffect(() => {
        dispatch(fetchTodolistsTC())

    }, [])

    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>( state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>( state => state.tasks)
    const dispatch = useDispatch()


    const changeTaskTitle = useCallback((taskID: string, title: string, todoListId:string) => {
        dispatch(updateTaskTC(taskID, {title}, todoListId))
    }, [dispatch])

    const removeTasks = useCallback((taskId: string, todolistId:string ) => {
      const thunk = removeTaskTC({todolistId, taskId })
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback((tasTitle: string, todoListId:string) => {                        //функция добавления элементов списка
        dispatch(addTaskTC(todoListId, tasTitle))
    }, [dispatch])

    const changStatus = useCallback((taskID: string, status: TaskStatuses, todoListId:string) => {
        dispatch(updateTaskTC(taskID, {status}, todoListId))
    }, [dispatch])

    const changeFilter = useCallback((newFilterValue: FilterValueType, todoListId:string) => {
        const action = ChangeFilterTodoListAC(todoListId, newFilterValue)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistTC(todoListID))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todoListID, newTitle))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
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


