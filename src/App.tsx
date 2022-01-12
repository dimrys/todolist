import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "./AddIItemForm";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api"
import {FilterValueType, TodoListDomainType} from './reducers/tl-reducer';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoList] = useState<Array<TodoListDomainType>>([
        {id: todoListId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todoListId2, title: "What to buy", filter: "all", addedDate: '', order: 0},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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

        ],

    })


    function changeTaskTitle(taskID: string, title: string, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function removeTasks(taskID: string, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})                //функция удаление элементов списка
    }

    function addTask(tasTitle: string, todoListId: string) {                        //функция добавления элементов списка
        const newTask: TaskType = {
            id: v1(),
            title: tasTitle,
            status: TaskStatuses.New,
            todoListId: todoListId,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changStatus(taskID: string, status: TaskStatuses, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }


    function changeFilter(newFilterValue: FilterValueType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoList([...todoLists])
        }

    }

    function removeTodoList(totoListID: string) {
        setTodoList(todoLists.filter(tl => tl.id !== totoListID))
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
        const newTodoList: TodoListDomainType = {
            id: newTodoListID, title: title, filter: "all", addedDate: '', order: 0
        }
        setTodoList([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})

    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todoLists.map(tl => {
                            let taskForToDoList = tasks[tl.id]
                            if (tl.filter === "active") {
                                taskForToDoList = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === "completed") {
                                taskForToDoList = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                            }

                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={10} style={{padding: "10px"}}>
                                        <TodoList title={tl.title}
                                                  id={tl.id}
                                                  tasks={taskForToDoList}
                                                  removeTasks={removeTasks}
                                                  changeFilter={changeFilter}
                                                  addTask={addTask}
                                                  changStatus={changStatus}
                                                  filter={tl.filter}
                                                  removeTodoList={removeTodoList}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTodoListTitle={changeTodoListTitle}
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


