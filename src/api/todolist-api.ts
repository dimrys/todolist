import axios, {AxiosResponse} from 'axios'

const innstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '51a774b8-e860-4049-a6ca-bcaa43b89b2e'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return innstance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTodolists() {
        return innstance.get<Array<TodoListType>>('todo-lists')
    },
    createTodolist(title: string) {
        return innstance.post<ResponseType<{item: TodoListType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return innstance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks (todolistId: string) {
        return innstance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return innstance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model:UpdateTaskModalType ) {
        return innstance.put<UpdateTaskModalType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model )
    },
    deleteTask(payload: { todolistId: string, taskId: string }) {
        return innstance.delete<ResponseType>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
    }
}

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModalType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

