import React from 'react'
import ReactDOM from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import { HelmetProvider } from 'react-helmet-async'
import { ConnectionProvider } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'

import { ClientWalletProvider } from './contexts/ClientWalletProvider'

import { App } from './app'

import '@radix-ui/themes/styles.css'
import './styles/global.css'
import './styles/theme-config.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Theme id="radix-root">
        <ConnectionProvider endpoint={web3.clusterApiUrl('devnet')}>
          <ClientWalletProvider autoConnect>
            <App />
          </ClientWalletProvider>
        </ConnectionProvider>
      </Theme>
    </HelmetProvider>
  </React.StrictMode>
)
