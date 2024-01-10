import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

// Components
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { Button } from '@/components/UI/Button'

import './styles.scss'

export const SwapButton: React.FC = () => {
  const { publicKey } = useWallet()
  return <div className="swap-button">{publicKey ? <Button title="Swap" /> : <ConnectWalletButton />}</div>
}
