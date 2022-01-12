import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type TaskPropsType = {
    task: TaskType
    todoListId: string
    removeTasks: (taskID: string, todoListId: string) => void
    changStatus: (taskID: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
 console.log('Task changed')
    const onClickHandler = useCallback(() => {
        props.removeTasks(props.task.id, props.todoListId)
    }, [props.removeTasks, props.task.id, props.todoListId])

   const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
       let newIsDoneValue = e.currentTarget.checked
       props.changStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New , props.todoListId)
   }, [props.changStatus, props.task.id, props.todoListId])

    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    }, [props.changeTaskTitle,props.task.id, props.todoListId])


    return (
        <li className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                color={"secondary"}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatus}
            />

            <EditableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
            {/*<button onClick={onClickHandler}>X</button>*/}
        </li>)
})