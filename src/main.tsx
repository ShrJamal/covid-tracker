import Axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { baseURL } from './api'
import App from './pages'
import './static/global.css'

Axios.defaults.baseURL = baseURL
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
