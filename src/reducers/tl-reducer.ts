
import {v1} from "uuid";
import {TodoListType} from "../api/todolist-api";


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

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
}

const initialState: Array<TodoListDomainType> = []



export const todoListReducer = (state:Array<TodoListDomainType> = initialState, action: ActionType):Array<TodoListDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodoList: TodoListDomainType = {
                id: action.todoListId,
                title: action.title,
                addedDate: '',
                order: 0,
                filter: "all"
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