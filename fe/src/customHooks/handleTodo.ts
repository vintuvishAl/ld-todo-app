import React from 'react'
import { useFetch } from './api'
import { useTodos } from './todoContext'
import { getApiUrl } from '../utils'
import { useToastNotification } from '../UiToolKit/ToastNotification'
import { ITodoProps } from '../todosInterface'
import { useTranslation } from '../TranslationUtils'

const reorder = (Todoslist: ITodoProps[], startIndex: number, endIndex: number) => {
    let newIndex
    Todoslist.map((todo: ITodoProps, index: number) => {
        if(index === endIndex){
          newIndex = todo.index
          return true
        }
        return true
    })
    const [removed] = Todoslist.splice(startIndex, 1);
    Todoslist.splice(endIndex, 0, removed);
    return {Todoslist, newIndex};
}

const updateTodoIndexs = (list1: ITodoProps[], list2: ITodoProps[]) => {
    const newTodoList = list2.map((todo: any, i: number) => {
        const {index, ...props} = todo
        return {...props, index: list1[i].index}
    })
    return newTodoList
    
}

export const useHandleTodo = () => {
    const { todosState, setTodosList, updateTodosList, editTodo, setLoading }  = useTodos()
    const { fetchData, loading } = useFetch()
    const { addToast } = useToastNotification()
    const { t } = useTranslation()

    const getTodos = () => {
        const options = { url: getApiUrl(todosState.tabIndex, todosState.currentPage), method: 'GET' }
       
        fetchData(options, (data: any, error: any) => {
            if(error){
                addToast(t('networkError'),  {variant: 'error'})
            }
            if(data.status){
                setTodosList(data, todosState.tabIndex, todosState.currentPage)
            }
            
        })
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>, todo: ITodoProps) => {
        const formData = new FormData();
        formData.append('completed', `${event.target.checked}`)
        const options = { 
            url : `todo/${todo.id}?_method=patch`,
            method: 'POST',
            data: formData
        }
        fetchData(options, (data: any, error: any) => {
            if(data.status){
                addToast(t('todoAdded'),  {variant: 'success'})
                getTodos()
            }
            if(error){
                addToast(t('networkError'),  {variant: 'error'})
            }
        })
    }

    const handleDelete = (todo: ITodoProps) => {
         const options = { 
            url : `todo/${todo.id}`,
            method: 'DELETE'
        }
        fetchData(options, (data: any, error: any) => {
            if(data.status){
                addToast(t('todoDeleted'),  {variant: 'success'})
                getTodos()
            }
            if(error){
                addToast(t('networkError'),  {variant: 'error'})
            }
        })
    }

    const handleDragandDrop = async (result: any) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }
        const {Todoslist, newIndex} = reorder(
            todosState.data,
            result.source.index,
            result.destination.index
        );
        const updatedTodoList = updateTodoIndexs(
            todosState.data,
            Todoslist,
        )
        updateTodosList(updatedTodoList)
        const formData = {index: newIndex}
        const options = { 
            url: `/todo/reorder/${result.draggableId}`, 
            method: 'PATCH',  
            data: formData  
        }
        fetchData(options, (data: any, error: any) => {
            if(error){
                addToast(t('notUpdated'), {variant: 'error'})
            }
            if(data.status){
                addToast(t('updated'), {variant: 'success'})
            }
        })
    }

    const handleTabChange = async (tabIndex: number) => {
        const options = { url: getApiUrl(tabIndex), method: 'GET' }
        fetchData(options, (data: any, error:any) => {
            if(error){
                addToast(t('networkError'),  {variant: 'error'})
            }
            if(data.status){
                setTodosList(data, tabIndex)
            }
            
        })  
    }

    const handlePageUpdate = async (pagenumber: number) => {
        const options = { url: getApiUrl(todosState.tabIndex, pagenumber), method: 'GET' }
        fetchData(options, (data: any, error:any) => {
            if(error){
                addToast(t('networkError'),  {variant: 'error'})
            }
            if(data.status){
                setTodosList(data, todosState.tabIndex, pagenumber)
            }
        })
    }

    const handleEditTodo = async (newTodo: any, todoId: number, onDialogClose: any, index: number ) => {
        const { name, picture} = newTodo
        const formData = new FormData();
        formData.append('picture', picture || '');
        formData.append('name', name)
        
        const options = { url: `/todo/${todoId}?_method=patch`, method: 'POST', data: formData }
        fetchData(options, (data: any, error: any) => {
            if(error){
                addToast(t('notUpdatedNetworkError'),  {variant: 'error'})
                onDialogClose()
            }
            if(data.status){
                addToast(t('updated'),  {variant: 'success'})
                editTodo(data, index)
                onDialogClose()
            }
            
        })
    }

    const handleCreateTodo = async (newTodo: any, setError: any, onDialogClose: any) => {
        const { name, picture} = newTodo
        if(!name){
            setError(true)
            addToast(t('nameRequired'),  {variant: 'error'})
        }
        if(name){
            const formData = new FormData()
            formData.append('picture', picture)
            formData.append('name', name)
            const options = { url: getApiUrl(), method: 'POST', data: formData }
            
            fetchData(options, (data: any, error:any) => {
                if(error){
                    addToast(t('createTodoError'),  {variant: 'error'})
                    onDialogClose()
                }
                if(data.status){
                    const options = { url: getApiUrl(todosState.tabIndex), method: 'Get' }
                    fetchData(options, (data: any, error: any) => {
                        if(error){
                            addToast(t('networkError'),  {variant: 'error'})
                            onDialogClose()
                        }
                        if(data.status){
                            setTodosList(data)
                            onDialogClose()
                        }
                        
                    })
                }
            })    
        }
    }

    return  {   todosState,
                handleEditTodo,
                handleCreateTodo,
                handleStatusChange,
                handleDelete,
                handleDragandDrop,
                handlePageUpdate,
                handleTabChange,
                loading,
                setLoading
            }
}