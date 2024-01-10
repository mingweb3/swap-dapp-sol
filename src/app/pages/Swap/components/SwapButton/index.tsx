import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import React from 'react'

import './styles.scss'

export const SwapButton: React.FC = () => {
  return (
    <div className="swap-button">
      <ConnectWalletButton />
    </div>
  )
}
