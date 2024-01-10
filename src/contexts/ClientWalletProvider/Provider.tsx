import type { WalletProviderProps } from '@solana/wallet-adapter-react'
import { WalletProvider } from '@solana/wallet-adapter-react'

import {
  BitpieWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinhubWalletAdapter,
  MathWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  SolongWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SolflareWalletAdapter,
  TokenPocketWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { useMemo } from 'react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import '@solana/wallet-adapter-react-ui/styles.css'

export const ClientWalletProvider: React.FC<Omit<WalletProviderProps, 'wallets'>> = props => {
  const wallets = useMemo(
    () => [
      new BitpieWalletAdapter(),
      new CloverWalletAdapter(),
      new Coin98WalletAdapter(),
      new CoinhubWalletAdapter(),
      new MathWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolongWalletAdapter(),
      new PhantomWalletAdapter(),
      new SafePalWalletAdapter(),
      new SolflareWalletAdapter(),
      new TokenPocketWalletAdapter()
    ],
    []
  )

  return (
    <WalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
    </WalletProvider>
  )
}
