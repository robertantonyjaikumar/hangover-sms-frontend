// import './App.css'
import Router from './routes'
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from "react-redux"
import store from "./Store/store"
import theme from './Theme';
function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App
