import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddIItemForm";
import EditableSpan from "./EditableSpan";

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
    changeTodoListTitle: (totoListID: string, newTitle: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId:string) => void
}

export function TodoList(props: TodoListPropsType) {
    const addTask =  (title: string) => {
        props.addTask (title, props.id)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (newTitle:string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }


    const all = ()=>{props.changeFilter('all', props.id)}
    const active = ()=>{props.changeFilter('active', props.id)}
    const completed = ()=>{props.changeFilter('completed', props.id)}

    return (
        <div>

            <h3> <EditableSpan title={props.title} changeItem={changeTodoListTitle}/>

                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem ={addTask} />

            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {props.removeTasks(t.id, props.id)}
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const changeTitle = (title: string) => {
                            props.changeTaskTitle(t.id, title, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input
                                    type={"checkbox"}
                                    checked={t.isDone}
                                    onChange={changeStatus}
                                />
                                <EditableSpan title={t.title} changeItem = {changeTitle} />
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