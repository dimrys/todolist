import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from 'uuid';

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
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

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all" },
        {id: todoListId2, title: "What to buy", filter: "all" },
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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
        ],

    })



    function changeTaskTitle(taskID: string, title: string, todoListId:string) {
        const todoListTasks = tasks[todoListId]
        const task: TasksType| undefined = todoListTasks.find(t => t.id === taskID )
        if (task){
            task.title = title
            setTasks({...tasks})
        }}
    function removeTasks(taskID: string, todoListId:string ) {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})                //функция удаление элементов списка
    }
    function addTask(tasTitle: string, todoListId:string) {                        //функция добавления элементов списка
        const newTask: TasksType = {
            id: v1(),
            title: tasTitle,
            isDone: false
        }
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }
    function changStatus(taskID: string, isDone: boolean, todoListId:string) {
        const todoListTasks = tasks[todoListId]
        const task: TasksType| undefined = todoListTasks.find(t => t.id === taskID )
        if (task){
            task.isDone = isDone
            setTasks({...tasks})
        }

        // const newTasks = tasks.map(t => {
        //     if(t.id === taskID) {
        //         return {...t, isDone:isDone }
        //     } else {
        //         return t
        //     }
        // })
        // setTasks(newTasks)

    }



    function changeFilter(newFilterValue: FilterValueType, todoListId:string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if(todoList) {
            todoList.filter = newFilterValue
            setTodoList([...todoLists])
        }

    }
    function removeTodoList(totoListID: string) {
        setTodoList(todoLists.filter(tl => tl.id !==totoListID))
        delete tasks[totoListID]
        setTasks({...tasks})
    }
    function changeTodoListTitle(totoListID: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === totoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoList([...todoLists])
        }
    }
    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id:newTodoListID, title: title, filter: "all"
        }
        setTodoList([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})

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

export default App;


