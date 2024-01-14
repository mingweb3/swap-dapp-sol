import { TokenInfo } from '@solana/spl-token-registry'

export interface TokenData {
  amount: string | null
  tokenInfo: TokenInfo
}

export interface TokenPrice {
  [key: string]: {
    usd: number
    usd_24h_change: number
  }
}

export type SwapInputType = 'from' | 'to'

export interface SplTokenDisplayData {
  symbol: string
  mint: string
  pubkey: string
  amount: number
}

export interface SplToken {
  pubkey: string
  parsedInfo?: {
    isNative?: boolean
    mint: string
    owner?: string
    state?: string
    tokenAmount?: {
      amount: string
      decimals: string
      uiAmount: number
      uiAmountString: string
    }
  }
  amount: number
}

export interface SwapInstruction {
  instruction: number
  amountIn: bigint
  minimumAmountOut: bigint
}
