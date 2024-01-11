import { TokenInfo } from '@solana/spl-token-registry'

export interface TokenData {
  amount: number | null
  tokenInfo: TokenInfo
}

export interface TokenPrice {
  [key: string]: {
    usd: number
    usd_24h_change: number
  }
}

export type SwapInputType = 'from' | 'to'
