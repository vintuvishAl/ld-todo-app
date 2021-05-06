import React from 'react'
import ldLogo from '../Assets/ld-logo.png'
import { Box, Select, MenuItem } from '@material-ui/core'
import { TodosProvider } from '../customHooks/todoContext'
import { TodoTabs } from './TodoTabs'
import { useCurrentLanguage, languages, useTranslation } from '../TranslationUtils'
import { ToastNotificationProvider } from '../UiToolKit/ToastNotification'


const Todos = () => {
  const { getCurrentLanguageCode, setCurrentLanguageCode } = useCurrentLanguage()
  const { t } = useTranslation()
  const allTodos = {data: [] , loading: false, tabIndex: 0, pageCount:0, currentPage: 0}
  React.useEffect(() => {
    document.title = t('app_title')
  }, [getCurrentLanguageCode, t])

  return (
    <>
      <Box display='flex' flexDirection='row' p={2} alignItems='center' justifyContent='space-between' >
        <Box ml={5} ></Box>  
        <Box>
          <img alt='ld-logo' src={ldLogo}/>    
        </Box>  
        <Box alignItems='center' mr={5}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getCurrentLanguageCode}
          onChange={setCurrentLanguageCode}
        >
          {languages.map((language: any, index: number) => {
            return(
              <MenuItem value={language.code} key={language.code}>
                <span className={`flag-icon flag-icon-${language.country_code} flag-icon-rounded mx-2`}/>
                &nbsp; {language.name}
              </MenuItem>
            )
          })}
        </Select>
        </Box>
      </Box> 
      <TodosProvider allTodos={allTodos}>
        <ToastNotificationProvider>
          <TodoTabs/>
        </ToastNotificationProvider>
      </TodosProvider>
    </>
  )
}

export default Todos;
