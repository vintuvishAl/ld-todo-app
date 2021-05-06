import React from 'react';
import  {  makeStyles, IconButton } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core'
import Check from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/EditOutlined'
import { onfileupload } from '../utils'

const useStyles = makeStyles((theme) => ({
  image: {
    border: `2px dashed ${theme.palette.secondary.main}`,
    boxSizing: 'border-box',
    borderRadius: '16px'
  },
  checkIcon: {
    backgroundColor: `${theme.palette.success.main}`,
  },
  addIcon: {
    fontSize: '2rem', 
    color: theme.palette.primary.dark
  },
  imageInput:  {
    opacity: 0,
    width: '100%',
    cursor: 'pointer',
    height: '100%',
    position: 'absolute'
  },
  checkIconColor:{
    color: '#ffffff'
  },
  root: image => ({
    display: image ? 'none' :'flex',  
    position: 'relative', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '35vw', 
    height: '162px', 
    border: `2px dashed ${theme.palette.secondary.main}`, 
    boxSizing: 'border-box', 
    borderRadius: '16px', 
    background: theme.palette.secondary.light
  }),
 
}));

  
  export const ImageUploader = (props: any) => {
    const {  onChange, value, withEditPicture } = props
    const [imageString, setImageString] = React.useState(value)
    const [editPicture, setEditPicture] = React.useState(withEditPicture || '')
    const classes = useStyles(imageString || editPicture ? true : false)
    
    const handleImageChange = (e: any) => {
      onfileupload(e, setImageString, onChange)
    }

    const handleEditImage = () => {
      setImageString('')
      setEditPicture('')
      onChange ('')
    }
    return (        
        <>
          <Box display={imageString || editPicture ? 'flex' : 'none' } flexDirection='row' >
            {editPicture &&
              <>
                <img width="236px" alt='todo-item' height="162px" className={classes.image} src={editPicture} />
                <Box display='flex' ml={5} alignItems='center' justifyContent='center' flexDirection='column'>
                  <Box display='flex' alignItems='center' justifyContent='center'>
                    <IconButton aria-label="edit" onClick={handleEditImage}>
                      <EditIcon color='primary' />
                    </IconButton>
                  </Box>
                  <Typography>Edit Image</Typography>
                </Box>
              </>
            }
            {imageString && 
              <>
                <img width="236px" alt='todo-item' height="162px" className={classes.image} src={imageString} />
                <Box display='flex' ml={5} alignItems='center' justifyContent='center' flexDirection='column'>
                  <Box className={classes.checkIcon} display='flex' alignItems='center' justifyContent='center' height='24px' width='24px'  borderRadius='50%'>
                    <Check className={classes.checkIconColor}/>
                  </Box>
                  <Typography>Image Added</Typography>
                </Box>
              </>
            }
          </Box>
          <Box className={classes.root}>
            <Box className={classes.addIcon}>&#43;</Box>
            <Typography>Insert Image</Typography>
            <input type="file" className={classes.imageInput} onChange={handleImageChange}  />
          </Box>
        </>        
      ) 
  }