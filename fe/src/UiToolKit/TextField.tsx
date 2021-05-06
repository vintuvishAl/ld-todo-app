import React from 'react';
import  {  makeStyles, IconButton } from '@material-ui/core'
import TextField, { TextFieldProps as _TextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Clear from '../Assets/inputClose.png'

type TextFieldProps = _TextFieldProps | {onChange: any, error: string, value: String}

const useStyles = makeStyles((theme) => ({
  root: {
    border: `2px solid ${theme.palette.secondary.light}`,
    borderRadius: '16px',
    width: '35vw',
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      border: `2px solid ${theme.palette.primary.dark}`
    },
    "&$focused": {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.secondary.light,
      border: `2px solid ${theme.palette.primary.dark}`
    }
  },
  focused: {}
}));

export const _TextField = (props: TextFieldProps) => {  
    const {onChange, value, error, ...more} = props
    const classes = useStyles();
    const onError = error ? true : false

    const handleClear = () => {
      onChange('')
    }

    const EndAdornment = () => {
      return (
        value ?
        <InputAdornment position="end">
          <IconButton aria-label="delete" onClick={handleClear}>
            <img alt='input-close' src={Clear}></img>
          </IconButton>
        </InputAdornment>
        :
        <></>
      )
    }
    
    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {  
      const name  = (e && e.target !=null && e.target.value !=null) ? e.target.value : e    
      onChange (name)  
    }

    return (
      <TextField 
        InputProps={{ classes, disableUnderline: true, endAdornment: EndAdornment() }} 
        value={value}
        error={onError}
        variant="filled" 
        onChange={handleChange} 
        {...more}
      />
    )
}