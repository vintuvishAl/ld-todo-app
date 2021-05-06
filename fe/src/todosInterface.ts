export interface ITodoProps {
    id: string
    name: string
    picture: {
        picture: string
        thumbnail: string
    }
    index: number
    completed: boolean
    created_at: string
    updated_at: string
}

export interface ITodoListProps {
    todos: ITodoProps[]
}


export interface IShowTodos {
    showActive?: boolean,
    showAll?: boolean,
    showInactive?: boolean
}
 


export enum TodoActionKind {
    LoadTodos = 'LOADTODO',
    UpdateTodos = 'UPDATETODOS',
    Loading = 'LOADING'
}

export interface Payload {
    data: ITodoProps[]
    loading: boolean
    tabIndex: number
    currentPage: number
    pageCount: number
}

export interface IJsonList {
    allTodos: Payload,
    children: React.ReactNode
}

export interface ITodoAction  {
    type: TodoActionKind,
    payload: Payload
}
