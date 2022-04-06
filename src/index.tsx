import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from '@/views/App'
import Providers from '@/Providers'

import reportWebVitals from '@/reportWebVitals'
import '@/lang'
import '@/style/style.scss'

ReactDOM.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
