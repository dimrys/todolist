import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistsActionTypes} from "./tl-reducer";
import {TaskStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModalType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";


type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
type AddActionType = {
    type: "ADD-TASK"
    task: TaskType
}
// type ShangStatusType = {
//     type: "CHANG-STATUS"
//     taskID: string
//     status: TaskStatuses
//     todoListId: string
// }
// type ShangTitleType = {
//     type: "CHANG-TITLE"
//     taskID: string
//     title: string
//     todoListId: string
// }

export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type ActionType =
    RemoveTaskActionType
    | AddActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistsActionTypes
    | SetTasksActionType
    | UpdateTaskActionType

const initialState: TaskStateType = {}


export const taskReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        case "SET-TODOLIST": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map( task => {
                    if(task.id === action.taskID) {
                        return {...task, ...action.model}
                    } else {
                        return  task
                    }
                })
            }
        }
        case "ADD-TODOLIST" : {
            return {
                ...state,
                [action.todolist.id]: []
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

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (task: TaskType): AddActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (todoListId: string, taskID: string, model: UpdateDomainModelType) => {
    return {type: 'UPDATE-TASK', todoListId, taskID, model} as const
}
// export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListId: string): ShangStatusType => {
//     return {type: 'CHANG-STATUS', taskID, status, todoListId}
// }
//
// export const changeTaskTitleAC = (taskID: string, title: string, todoListId: string): ShangTitleType => {
//     return {type: 'CHANG-TITLE', taskID, title, todoListId}
// }
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}

// export const removeTaskTC = (taskID: string, todoListId:string) => (dispatch: Dispatch) => {
//     todolistAPI.deleteTask(todoListId, taskID)
//         .then((res) => {
//             if(res.data.resultCode === 0) {
//                 dispatch(removeTaskAC(taskID, todoListId))
//             }
//         })
// }
export const removeTaskTC = (payload: { todolistId: string, taskId: string }) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(payload)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(payload.taskId, payload.todolistId))
            }
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            let task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}


// export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => {
//
//         const allTasks = getState().tasks
//         const tasksForCurrentTodo = allTasks[todolistId]
//         const task = tasksForCurrentTodo.find(t => t.id === taskId)
//
//         if (task) {
//             todolistAPI.updateTask(todolistId, taskId, {
//                 title: task.title,
//                 startDate: task.startDate,
//                 priority: task.priority,
//                 description: task.description,
//                 deadline: task.deadline,
//                 status
//             })
//                 .then((res) => {
//                     dispatch(changeTaskStatusAC(taskId, status, todolistId))
//                 })
//         }
//     }


export type UpdateDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskID: string, domainModel: UpdateDomainModelType, todoListId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasks = getState().tasks
        const tasksForCurrentTodo = allTasks[todoListId]
        const task = tasksForCurrentTodo.find(t => t.id === taskID)
        if (task) {
            const apiModel: UpdateTaskModalType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }
            todolistAPI.updateTask(todoListId, taskID, apiModel)
                .then((res) => {
                    dispatch(updateTaskAC(todoListId, taskID, domainModel))
                })
        }

    }

