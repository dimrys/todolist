import {FilterValueType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {TasksType} from "../TodoList";
import {AddTodoListActionType, RemoveTodoListActionType} from "./tl-reducer";


type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}
type AddActionType = {
    type: "ADD-TASK"
    taskTitle: string
    todoListId: string
}
type ShangStatusType = {
    type: "CHANG-STATUS"
    taskID: string
    isDone: boolean
    todoListId: string
}
type ShangTitleType = {
    type: "CHANG-TITLE"
    taskID: string
    title: string
    todoListId: string
}


export type ActionType =
    RemoveTaskActionType
    | AddActionType
    | ShangStatusType
    | ShangTitleType
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TaskStateType = {}


export const taskReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            let tasksForTodoList = copyState[action.todoListId]
            copyState[action.todoListId] = tasksForTodoList.filter(t => t.id !== action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            let copyState = {...state}
            const newTask: TasksType = {id: v1(), title: action.taskTitle, isDone: false}
            const todoListTasks = copyState[action.todoListId]
            copyState[action.todoListId] = [newTask, ...todoListTasks]
            return copyState
        }
        case "CHANG-STATUS": {
            let copyState = {...state}
            const todoListTasks = copyState[action.todoListId]
            const task: TasksType | undefined = todoListTasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case "CHANG-TITLE": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD-TODOLIST" : {
            return {
                ...state,
                [action.todoListId]: []
            }
        }
        case "REMOVE-TODOLIST" : {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}
export const addTaskAC = (taskTitle: string, todoListId: string): AddActionType => {
    return {type: 'ADD-TASK', taskTitle, todoListId}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListId: string): ShangStatusType => {
    return {type: 'CHANG-STATUS', taskID, isDone, todoListId}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListId: string): ShangTitleType => {
    return {type: 'CHANG-TITLE', taskID, title, todoListId}
}
