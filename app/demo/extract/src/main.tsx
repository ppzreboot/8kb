import React from 'react'
import ReactDom from 'react-dom/client'
import { app_state } from './sdd'
import { App } from './ui'
import './global.css'

ReactDom.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <App {...app_state} />
  </React.StrictMode>
)
