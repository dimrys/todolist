import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./tl-reducer";
import {TaskStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";


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
    status: TaskStatuses
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
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {id: v1(), title: action.taskTitle, status: TaskStatuses.New,
                todoListId: action.todoListId, description: '',startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low}
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        }
        case "CHANG-STATUS": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, status: action.status}
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
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListId: string): ShangStatusType => {
    return {type: 'CHANG-STATUS', taskID, status, todoListId}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListId: string): ShangTitleType => {
    return {type: 'CHANG-TITLE', taskID, title, todoListId}
}
