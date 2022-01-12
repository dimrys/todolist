import React, {useCallback} from "react";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "./AddIItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValueType} from "./reducers/tl-reducer";


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    addTask: (taskTitle: string, todoListId:string) => void
    removeTasks: (taskID: string, todoListId:string) => void
    changStatus: (taskID: string, status: TaskStatuses, todoListId:string) => void
    changeFilter: (newFilterValue: FilterValueType, todoListId:string) => void
    removeTodoList: (totoListID: string) => void
    changeTodoListTitle: (totoListID: string, newTitle: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId:string) => void
}
export const TodoList = React.memo((props: TodoListPropsType) => {

    let taskForToDoList = props.tasks
    if(props.filter === "active"){
        taskForToDoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if(props.filter === "completed"){
        taskForToDoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    console.log("Todolist called")
    const addTask = useCallback((title: string) => {
        props.addTask (title, props.id)
    }, [props.addTask, props.id])

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props.removeTodoList, props.id])

    const changeTodoListTitle = useCallback((newTitle:string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])


    const all = useCallback(()=>{props.changeFilter('all', props.id)}, [props.changeFilter, props.id ])
    const active = useCallback(()=>{props.changeFilter('active', props.id)}, [props.changeFilter, props.id])
    const completed = useCallback(()=>{props.changeFilter('completed', props.id)}, [props.changeFilter, props.id])

    return (
        <div>

            <h3> <EditableSpan title={props.title} changeItem={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTodoList}>X</button>*/}
            </h3>
            <AddItemForm addItem ={addTask} />

            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {
                    taskForToDoList.map(t => {

                        return (
                            <Task key={t.id}
                                  task={t}
                                  todoListId={props.id}
                                  removeTasks={props.removeTasks}
                                  changStatus={props.changStatus}
                                  changeTaskTitle={props.changeTaskTitle}
                            />)
                    })
                }

            </ul>
            <div>
                <Button
                    size={"small"}
                    color={ props.filter === "all" ? "secondary": "primary"}
                    variant={"contained"}
                    onClick={all}>All
                </Button>
                <Button
                    size={"small"}
                    color={ props.filter === "active" ? "secondary": "primary"}
                    variant={"contained"}
                    onClick={active}>Active
                </Button>
                <Button
                    size={"small"}
                    color={ props.filter === "completed" ? "secondary": "primary"}
                    variant={"contained"}
                    onClick={completed}>Completed
                </Button>
            </div>
        </div>
    )

})

