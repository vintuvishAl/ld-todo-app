import React from 'react'
import {  _Tabs as Tabs, _Tab as Tab   } from '../UiToolKit/Tabs'
import { Pagination } from '../UiToolKit/Pagination'
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import { TodoPopUp } from './TodoPopUp'
import { ListWithLoadingIndicator } from './TodoList'
import { useTranslation } from 'react-i18next'
import { tabs } from '../utils'
import { useHandleTodo } from '../customHooks/handleTodo'

const useStyles= makeStyles(() => ({
    PaperStyle: {
        marginLeft: '3vw',
        marginRight: '3vw',
        height: '86vh',
        padding: '2rem'    
    },
    TabBoxStyle: {
        overflow: 'auto'
    },
    ModalBoxStyle: {
        outline: 'none'
    }
}));


export const TodoTabs = () => {
    const { todosState, handleTabChange, handlePageUpdate, loading, setLoading } = useHandleTodo()
    const { t } = useTranslation()
    const [open, setOpen] = React.useState(false)
    const init = 0
    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    React.useEffect(() => {
        if(loading){
            setLoading()
        }
    }, [loading, setLoading])
    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box marginTop='15vh' mx='15vw' className={classes.ModalBoxStyle}>
                    <TodoPopUp onDialogClose={handleClose}/>
                </Box>
            </Modal>
            <Paper elevation={5} className={classes.PaperStyle} >
                <Box 
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Typography variant="h4">
                        {t('app_title')}
                    </Typography>
                    <Button 
                        variant="contained"
                        data-testid="add-todo"
                        color="primary"
                        onClick={handleOpen}
                    >
                        Add To-Do
                    </Button>
                </Box>
                <Box pt={1}>
                    <Tabs init={init}>
                        {tabs.map((tab) =>{
                            return(
                                <Tab 
                                    key={tab.labelName}
                                    data-testid={tab.dataTestid}
                                    label={t(tab.labelName)}
                                    onClick={() => handleTabChange(tab.index)}
                                >
                                    <Box 
                                        mt={2}
                                        height='57vh'
                                        className={classes.TabBoxStyle}
                                    >
                                        <ListWithLoadingIndicator isLoading={todosState.loading}/>
                                    </Box>
                                </Tab>
                            )
                        })}
                    </Tabs>
                </Box>
               <Pagination 
                    pageCount={todosState.pageCount}
                    currentPage={todosState.currentPage}
                    onPageUpdate={handlePageUpdate}
                />
            </Paper> 
        </>
    )
}