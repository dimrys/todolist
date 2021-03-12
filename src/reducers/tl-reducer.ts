import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
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

const initialState: Array<TodoListType> = []

export const todoListReducer = (state = initialState, action: ActionType):Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {

            const newTodoList: TodoListType = {
                id: action.todoListId, title: action.title, filter: "all"
            }
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
export const AddTodoListAC = (title:string):AddTodoListActionType => {
    return {type: 'ADD-TODOLIST',title, todoListId: v1() }
}
export const ChangeFilterTodoListAC = (id:string, filter:FilterValueType):ChangeFilterActionType => {
    return {type: 'CHANGE-FILTER',filter: filter, id: id}
}
export const ChangeTitleTodoListAC = (id:string, title:string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TITLE', id, title}
}