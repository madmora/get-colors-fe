import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import Providers from 'lib/providers'
import { BrowserRouter } from 'react-router-dom'
import { Routing } from 'lib/routing'
import { App } from 'App'
import TtlSession from 'components/ttl-session'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Providers>
      <TtlSession>
        <BrowserRouter>
          <App>
            <Routing />
          </App>
        </BrowserRouter>
      </TtlSession>
    </Providers>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
