import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './settings'
import CssBaseline from '@material-ui/core/CssBaseline'
import Todos from './Todo-Components/Todos'
import 'flag-icon-css/css/flag-icon.min.css'



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Todos/>
    </ThemeProvider>
  );
}

export default App;
