import { Box, Button, Paper, Typography, IconButton  } from '@material-ui/core'
import React from 'react';
import { ImageUploader } from '../UiToolKit/ImageUploader'
import { _TextField as TextField } from '../UiToolKit/TextField'
import CloseIcon from '@material-ui/icons/Close'
import { useHandleTodo } from '../customHooks/handleTodo'

export const  TodoPopUp = (props: any) => {
    const { todoName, todoPicture, todoId, index, onDialogClose } = props
    const { handleEditTodo, handleCreateTodo } = useHandleTodo()
    const [picture, setPicture] = React.useState('')
    const [name, setName] = React.useState(todoName || '')
    const [error, setError] = React.useState(false)
    
    const onCreateTodo = () => {
        handleCreateTodo({name, picture}, setError, onDialogClose)
    }

    const onEditTodo = () => {
        handleEditTodo({name, picture}, todoId, onDialogClose, index)
    }
           
    return(
        <Paper elevation={3}>
            <Box display='flex' flexDirection='row-reverse' px={4} pt={4}>
                <IconButton aria-label="delete" onClick={onDialogClose}>
                    <CloseIcon color='inherit'/>
                </IconButton>
            </Box>
            <Box  display='flex' flexDirection='column' alignItems='center' justifyContent='center' pb={4}>
                <Typography variant="h4">
                    {todoName ? "Edit Todo" : "Create new To-Do"}
                </Typography>
                <Box mt={3}>
                    <TextField data-testid="input-name" error={error} value={name} onChange={setName} label='Name To-Do*'/>
                </Box>
                <Box mt={3} >
                    <ImageUploader value={picture} withEditPicture ={ todoPicture && todoPicture } onChange={setPicture} />
                </Box>
                
                <Box mt={3}>
                    <Button data-testid="submit-todo" variant='contained' color='primary' onClick={todoName ? onEditTodo : onCreateTodo}>
                        {todoName ? "Edit Todo" : "Create ToDo"}
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}