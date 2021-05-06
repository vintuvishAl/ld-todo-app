import { SnackbarProvider, SnackbarProviderProps, useSnackbar } from 'notistack'
import  {  makeStyles } from '@material-ui/core'


const useStyles = makeStyles(({ palette }) => ({
    contentRoot: {
      backgroundColor: 'aqua',
    },
    variantSuccess: {
      backgroundColor: `${palette.success.main} !important`,
    },
    variantError: {
      backgroundColor: `${palette.error.main} !important`,
    },
    variantInfo: {
      backgroundColor: `${palette.info.main} !important`,
    },
    variantWarning: {
      backgroundColor: `${palette.warning.main} !important`,
    },
  }));

export const ToastNotificationProvider = (props: SnackbarProviderProps) => {
    const {children, ...more} = props
    const classes = useStyles()
    return(
        <SnackbarProvider  
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} 
            classes={classes} 
            maxSnack={1} 
            {...more}
        >
            {children}
        </SnackbarProvider>
    )
}

export const useToastNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return { addToast: enqueueSnackbar, closeToast: closeSnackbar}
}