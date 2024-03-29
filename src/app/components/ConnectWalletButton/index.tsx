import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

import './styles.scss'

export const ConnectWalletButton: React.FC = () => {
  const { publicKey, connecting } = useWallet()

  return (
    <div>
      {!publicKey ? (
        <WalletMultiButton>
          <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
        </WalletMultiButton>
      ) : (
        <div className="wallet-connected-wrapper">
          <WalletMultiButton />
        </div>
      )}
    </div>
  )
}
