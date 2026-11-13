import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import './Dictionary/i18n'

import { store } from './Redux/store'
import AppProviders from './Shared/AppProviders'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppProviders>
        <App />
      </AppProviders>
    </Provider>
  </StrictMode>,
)