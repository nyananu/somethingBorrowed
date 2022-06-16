import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import LoginPage from './components/LoginPage'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LoginPage />
    </Provider>
  </React.StrictMode>
)
