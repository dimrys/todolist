import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import AddItemForm from "./AddIItemForm";

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
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




    function removeTasks(taskID: string, todoListId:string ) {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})                //функция удаление элементов списка
    }

    function changeFilter(newFilterValue: FilterValueType, todoListId:string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if(todoList) {
            todoList.filter = newFilterValue
            setTodoList([...todoLists])
        }

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

    function changeTaskTitle(taskID: string, title: string, todoListId:string) {
        const todoListTasks = tasks[todoListId]
        const task: TasksType| undefined = todoListTasks.find(t => t.id === taskID )
        if (task){
            task.title = title
            setTasks({...tasks})
        }}


    return (
        <div className="App">
            <AddItemForm addItem ={addTodoList} />
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
                        <TodoList title={tl.title}
                                  key = {tl.id}
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
                    )
                })
            }
        </div>
    );
}

export default App;


