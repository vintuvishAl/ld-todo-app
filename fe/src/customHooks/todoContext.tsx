import React, { createContext } from 'react';
import { ITodoAction, TodoActionKind, Payload  } from '../todosInterface'
import { API } from './api'
export const TodoContext = createContext<{
    todosState: Payload;
    dispatch: React.Dispatch<any>;
    }>({
        todosState: {data: [], pageCount:0, loading: true, tabIndex: 0, currentPage: 0},
        dispatch: () => null
    });


const reducer = (todos:Payload , action: ITodoAction,) => {
    const { type, payload } = action
    switch (type){
        case TodoActionKind.UpdateTodos:
            return payload
        case TodoActionKind.Loading:
            return {data: [] , loading: payload.loading, tabIndex: 0, pageCount: payload.pageCount ? payload.pageCount : 0, currentPage: 0}
        default:
            return todos
    }
}

export const TodosProvider = (props: any) => {
    const { allTodos,  children } = props
    const [todosState,  dispatch] = React.useReducer(reducer, allTodos)
    const contextValue = React.useMemo(() => {
        return { todosState, dispatch };
    }, [todosState, dispatch]);
    
    React.useEffect(() => {
        const loadTodos = async () => {
            dispatch({
                type: TodoActionKind.Loading,
                payload: {data: [] , loading: true, tabIndex: 0, pageCount: 0, currentPage: 0}
            })
    
            await API.get(`/todo`)
                .then((response: any) => {
                    dispatch({
                        type: TodoActionKind.UpdateTodos,
                        payload: {data: response.data.data, pageCount: response.data.last_page, loading: false, tabIndex: 0, currentPage: 1}
                    })
                })
                
        }
        loadTodos()
    
    }, [dispatch])
    return (
        <TodoContext.Provider value={ contextValue }>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodos = () => {
    const {todosState, dispatch} = React.useContext(TodoContext)
    const editTodo = (response: any, i: number) => {
        const newTodos = todosState.data.map((todo: any, index: number) => {
            if(index === i){
               return response.data
            }
            return todo
        })
        dispatch({
            type: TodoActionKind.UpdateTodos,
            payload: {data: newTodos, loading: false, tabIndex: todosState.tabIndex, currentPage: todosState.currentPage, pageCount: todosState.pageCount}
        })
    }
    const setTodosList = (response: any, tabIndex?: number, currentPage?: number) => {
        dispatch({
            type: TodoActionKind.UpdateTodos,
            payload: {data: response.data.data, pageCount: response.data.last_page, loading: false, currentPage: response.data.current_page, tabIndex: (tabIndex === 0 || 1 || 3) ? tabIndex : todosState.tabIndex,}
        })
    }
    const setLoading = (currentPage?: number) => {
        dispatch({
            type: TodoActionKind.Loading,
            payload: {data: [] , loading: true, tabIndex: 0, pageCount: todosState.pageCount, currentPage: currentPage? currentPage : 0}
        })
    }
    const updateTodosList = (updatedList: any) => {
        dispatch({
            type: TodoActionKind.UpdateTodos,
            payload: {data: updatedList, loading: false, tabIndex: todosState.tabIndex, currentPage: todosState.currentPage, pageCount: todosState.pageCount}
        })
    }
    return { todosState, setTodosList, editTodo, setLoading, updateTodosList }
}