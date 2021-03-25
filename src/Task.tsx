import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./TodoList";

type TaskPropsType = {
    task: TasksType
    todoListId: string
    removeTasks: (taskID: string, todoListId: string) => void
    changStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
 console.log('Task changed')
    const onClickHandler = useCallback(() => {
        props.removeTasks(props.task.id, props.todoListId)
    }, [props.removeTasks, props.task.id, props.todoListId])

   const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
       props.changStatus(props.task.id, e.currentTarget.checked, props.todoListId)
   }, [props.changStatus, props.task.id, props.todoListId])

    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    }, [props.changeTaskTitle,props.task.id, props.todoListId])


    return (
        <li className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"secondary"}
                checked={props.task.isDone}
                onChange={changeStatus}
            />

            <EditableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
            {/*<button onClick={onClickHandler}>X</button>*/}
        </li>)
})