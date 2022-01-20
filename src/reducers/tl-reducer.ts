
import {v1} from "uuid";
import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";


export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    todolist: TodoListType
}
type ChangeFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValueType
    id: string
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: string
    id: string
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeFilterActionType
    | ChangeTodoListTitleActionType
    | SetTodolistsActionTypes

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
}

const initialState: Array<TodoListDomainType> = []



export const todoListReducer = (state:Array<TodoListDomainType> = initialState, action: ActionType):Array<TodoListDomainType> => {
    switch (action.type) {
        case "SET-TODOLIST": {
            return action.todolists.map(tl => ({
                ...tl,
                filter: "all"
            }))
        }

        case "ADD-TODOLIST": {
            const newTodoList: TodoListDomainType = {...action.todolist, filter: "all"}
            return [newTodoList, ...state]
        }
        case "REMOVE-TODOLIST": {
            return  state.filter(tl => tl.id !== action.id)
        }
        case "CHANGE-FILTER": {
            return state.map(tl => {
                if(tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
            return state.map(tl => {
                if(tl.id === action.id){
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }
        default:
            return state
    }
}

export const RemoveTodoListAC = (todoListId:string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}
export const AddTodoListAC = (todolist:TodoListType):AddTodoListActionType => {
    return {type: 'ADD-TODOLIST',todolist }
}
export const ChangeFilterTodoListAC = (id:string, filter:FilterValueType):ChangeFilterActionType => {
    return {type: 'CHANGE-FILTER',filter: filter, id: id}
}
export const ChangeTitleTodoListAC = (id:string, title:string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TITLE', id, title}
}

export const setTodolistAC = (todolists: Array<TodoListType>) => {
    return {type: 'SET-TODOLIST', todolists} as const
}

export type SetTodolistsActionTypes = ReturnType<typeof setTodolistAC>

export const fetchTodolistsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    todolistAPI.getTodolists()
        .then((res) => {
            let todos = res.data
            dispatch(setTodolistAC(todos))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(RemoveTodoListAC(todolistId))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            let todolist = res.data.data.item
            dispatch(AddTodoListAC(todolist))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(ChangeTitleTodoListAC(todolistId, title))
        })
}
