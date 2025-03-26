// import './App.css'
import Router from './routes'
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App
