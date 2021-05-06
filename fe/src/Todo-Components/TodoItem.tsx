import React from 'react'
import { Box, Checkbox, Typography, IconButton, Modal, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/EditOutlined'
import { TodoPopUp } from '../Todo-Components/TodoPopUp' 
import { ITodoProps } from '../todosInterface'
import { apiLink } from '../settings'
import { useHandleTodo } from '../customHooks/handleTodo'

const useStyles = makeStyles(({ palette }) => ({
    modalbox: {
        outline: 'none'
    },
    image: {
        borderRadius: '50%',
        height: '30px',
        width: '30px'
    },
    root: completed => ({
        backgroundColor: completed ? palette.primary.light : '#fff', 
        borderBottom: completed && `1px solid #D6D8E7 ${palette.primary.light}`, 
        textDecorationLine: completed && 'line-through',
        color: palette.secondary.dark,
        fontWeight: 600
    })  
}))

export const TodoItem = (props: {todo: ITodoProps, index: number}) => {
    const { handleStatusChange, handleDelete } = useHandleTodo()
    const { todo, index } = props
    const [editPopUpOpen, setEditPopUpOpen] = React.useState(false)
    const classes = useStyles(todo.completed)

    const handleClose = () => {
        setEditPopUpOpen(false);
    }

    return(
        <Grid 
            key={index}
            container
            className={classes.root}
            direction='row'
            justify='space-between'
            alignItems='center'
        >
            <Box 
                display='flex' 
                flexDirection='row' 
                alignItems='center' 
                justifyContent='center'
                p={1} 
            >
                <Box  px={2}>
                    <Checkbox
                        checked={todo.completed}
                        onChange={(e) => handleStatusChange(e, todo)}
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        color='primary'
                    />
                </Box>
                <Box pt={1} px={2}>
                    <img  
                        className={classes.image}
                        src={apiLink + '/' + todo.picture.thumbnail}
                        alt='todo-item'
                       >
                    </img>
                </Box>
                <Box flexGrow={3} px={2}>
                    <Typography variant="h6">
                        {todo.name}
                    </Typography>
                </Box>
            </Box>
            <Box display='flex' flexDirection='row' px={1}>
                <Typography>
                    <IconButton aria-label="edit" onClick={() => setEditPopUpOpen(true)}>
                        <EditIcon color='primary' />
                    </IconButton>
                </Typography>
                <Typography>
                    <IconButton aria-label="delete" onClick={() => handleDelete(todo)}>
                        <DeleteIcon color='error' />
                    </IconButton>
                </Typography>
            </Box>
            <Modal open={editPopUpOpen} onClose={() => setEditPopUpOpen(false)}>
                <Box marginTop='15vh' mx='15vw' className={classes.modalbox}>
                    <TodoPopUp
                      todoId={todo.id} 
                      todoName={todo.name} 
                      todoPicture={apiLink+ '/' +todo.picture.picture} 
                      index={index}
                      onDialogClose={handleClose}/>
                </Box>
            </Modal>
        </Grid>
    )
}