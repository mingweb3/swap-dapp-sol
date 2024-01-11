import { TokenData } from '@/types'

export const SECONDS_TO_REFRESH = 60

export const DEFAULT_FROM_DATA: TokenData = {
  tokenInfo: {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    chainId: 101,
    decimals: 6,
    extensions: {
      coingeckoId: 'usd-coin'
    },
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    name: 'USD Coin',
    symbol: 'USDC',
    tags: ['old-registry', 'solana-fm']
  },
  amount: 0
}

export const DEFAULT_TO_DATA: TokenData = {
  tokenInfo: {
    address: 'So11111111111111111111111111111111111111112',
    chainId: 101,
    decimals: 9,
    extensions: {
      coingeckoId: 'wrapped-solana'
    },
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    name: 'Wrapped SOL',
    symbol: 'SOL',
    tags: ['old-registry']
  },
  amount: 0
}
