import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'eb07f558-5d2f-47f9-adac-eb8b66d5228c',
    },
})

export const todoListAPI = {
    getTodolists() {
        return instance.get<GetTodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: GetTodolistType }>>('todo-lists', {title})

    },
    deleteTodolist(todoListID: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todoListID}`)
    },
    updateTodolist(todoListID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListID}`,
            {title}
        )
    },
}


type GetTodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

