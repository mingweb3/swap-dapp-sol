import React from 'react'
import ReactDOM from 'react-dom/client'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { App } from './app'
import { HelmetProvider } from 'react-helmet-async'
import { ClientWalletProvider } from './contexts/ClientWalletProvider'

import './styles/global.css'
import './styles/theme-config.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Theme id="radix-root">
        <ClientWalletProvider>
          <App />
        </ClientWalletProvider>
      </Theme>
    </HelmetProvider>
  </React.StrictMode>
)
