import React, { Fragment } from 'react';
import  {  makeStyles } from '@material-ui/core'
import Tabs, { TabsProps as _TabsProps }  from '@material-ui/core/Tabs';
import Tab, { TabProps as _TabProps } from '@material-ui/core/Tab';

export interface  TabsProps extends _TabsProps{
    children: any,
    init?: number
}

export interface  TabProps extends _TabProps{
  children: React.ReactNode,
}

const TabStyle = makeStyles((theme) => ({
  root: {
    minWidth: '0', 
    paddingLeft: '30px',
    paddingRight: '30px'
    }
}));

export const _Tabs = (props: TabsProps) => {
    const {children, init, ...more} = props
    const initTab = init || 0
    const [tab, SetTab] = React.useState(initTab)
    const classes = TabStyle()
    
    const handleTabClick = (tabIndex: number, onClick: any) => {
      SetTab(tabIndex)
      onClick()
    }
   
    return(
      <>
        <Tabs value={tab} {...more} TabIndicatorProps={{ children: <span /> }}>   
          { React.Children.map(children, (child: React.ReactElement, index: number) => {
              const { props } = child
              const { children, onClick, ...more } = props
              return (
                <Tab 
                  className={classes.root} 
                  onClick ={() => handleTabClick(index, onClick)} 
                  {...more} 
                />
              )
          })}
        </Tabs>
        <>
          { React.Children.map(children, (child: React.ReactNode, index: number) => {
              if(index === tab) return child
          })}
        </>
      </>
  )
}

export const _Tab = (props: TabProps) => {
  const { children } = props

  return(
    <>
      {children}
    </>
  )
}