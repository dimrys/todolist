import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    filter: FilterValueType
    addTask: (taskTitle: string, todoListId:string) => void
    removeTasks: (taskID: string, todoListId:string) => void
    changStatus: (taskID: string, isDone: boolean, todoListId:string) => void
    changeFilter: (newFilterValue: FilterValueType, todoListId:string) => void
    removeTodoList: (totoListID: string) => void
}

export function TodoList(props: TodoListPropsType) {
    let [titleTask, setTitleTask] = useState<string>('')
    let [error, setError]  = useState<string| null>( null)

    const addTask = () => {
        const trimmedTitle = titleTask.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle, props.id)

        } else  {
            setError("Title is required")
        }
        setTitleTask("")
    }

    const all = ()=>{props.changeFilter('all', props.id)}
    const active = ()=>{props.changeFilter('active', props.id)}
    const completed = ()=>{props.changeFilter('completed', props.id)}
    const onChangTitleTask = (e: ChangeEvent<HTMLInputElement> ) => {
        setTitleTask(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === 'Enter') addTask()}


    return (
        <div>
            <h3>{props.title}<button onClick={() =>{props.removeTodoList(props.id)}}>X</button></h3>
            <div>
                <input
                    value={titleTask}
                    onChange={onChangTitleTask}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error": ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {props.removeTasks(t.id, props.id)}
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input
                                    type={"checkbox"}
                                    checked={t.isDone}
                                    onChange={changeStatus}
                                />
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>X</button>
                            </li>)
                    })
                }

            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter": ""}
                    onClick={all}>All</button>
                <button
                    className={props.filter === "active" ? "active-filter": ""}
                    onClick={active}>Active</button>
                <button
                    className={props.filter === "completed" ? "active-filter": ""}
                    onClick={completed}>Completed</button>
            </div>
        </div>
    )

}