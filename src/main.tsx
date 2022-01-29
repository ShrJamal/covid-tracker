import React from 'react'
import Axios from 'axios'
import ReactDOM from 'react-dom'
import { baseURL } from './api'
import App from './pages'
import './static/global.css'
import { createTheme, ThemeProvider } from '@mui/material'

Axios.defaults.baseURL = baseURL

const theme = createTheme()

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
