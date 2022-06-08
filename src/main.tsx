import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './css/index.css'

import { load } from 'webfontloader'
import { registerSW } from 'virtual:pwa-register'

load({
  google: {
    families: ['Roboto', 'sans-serif'],
  },
})

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
