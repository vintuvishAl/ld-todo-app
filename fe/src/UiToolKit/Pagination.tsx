import React from 'react'
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { Pagination as MaterialPagination }  from '@material-ui/lab'
import IconButton from '@material-ui/core/IconButton'
import PaginationLeft from '../Assets/paginationLeft.png'
import PaginationRight from '../Assets/paginationRight.png'
const useStyles = makeStyles(({ palette }) => ({
    ul: {
        "& .MuiPaginationItem-root": {
          color: `${palette.secondary.main} !important`,
          fontWeight: '600 !important',
          fontSize: '16px'
    },
    '& .Mui-selected': {
        backgroundColor: 'transparent !important',
        color: `${palette.primary.dark} !important`,
        fontWeight: '600 !important'
       },
    },
}));
interface PaginationProps {
    pageCount: number,
    currentPage: number,
    onPageUpdate: any
}
export const Pagination = ( props: PaginationProps) => {
    const {pageCount, currentPage, onPageUpdate} = props
    const classes = useStyles()
    
    const onPageNumberChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageUpdate(value)
    }

    const onClickPagePrevButton = () => {
        const prev = (currentPage : number) => {
           return currentPage - 1
        }
        onPageUpdate(prev(currentPage))
    }

    const onClickPageNextButton = () => {
        const next = (currentPage : number) => {
            return currentPage + 1
        }
        onPageUpdate(next(currentPage))
    }

    return(
        <>
        { pageCount > 1 &&
            <Box display='flex' my={1} justifyContent="flex-end" alignItems='center' flexDirection='row'>
                {
                    currentPage > 1 ?
                    <IconButton onClick={onClickPagePrevButton}>
                        <img  src={PaginationLeft} alt='dialogClose'/>
                    </IconButton> :
                    <></>
                }
                <MaterialPagination hidePrevButton hideNextButton classes={classes} count={pageCount} page={currentPage} onChange={onPageNumberChange} />
                {
                    currentPage === pageCount? 
                    <></> :
                    <IconButton  onClick={onClickPageNextButton}>
                        <img  src={PaginationRight} alt='dialogClose'/>
                    </IconButton> 
                }
            </Box>
        }
        </>
    )
}