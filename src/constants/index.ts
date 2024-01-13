import { TokenData } from '@/types'
import { AAT_TOKEN_MINT, BBT_TOKEN_MINT } from './programs'

export const SECONDS_TO_REFRESH = 120

export const DEFAULT_FROM_DATA: TokenData = {
  tokenInfo: {
    address: AAT_TOKEN_MINT.toString(),
    chainId: 101,
    decimals: 9,
    extensions: {
      coingeckoId: 'aat-coin'
    },
    logoURI: '/images/tokens/aat.png',
    name: 'AAT Coin',
    symbol: 'AAT',
    tags: ['test']
  },
  amount: 0
}

export const DEFAULT_TO_DATA: TokenData = {
  tokenInfo: {
    address: BBT_TOKEN_MINT.toString(),
    chainId: 101,
    decimals: 9,
    extensions: {
      coingeckoId: 'bbt-coin'
    },
    logoURI: '/images/tokens/bbt.png',
    name: 'BBT Coin',
    symbol: 'BBT',
    tags: ['test']
  },
  amount: 0
}
