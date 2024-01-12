import React, { useCallback } from 'react'
import { AppContext } from './Provider'
import { TokenInfo } from '@solana/spl-token-registry'
import { SwapInputType, TokenData, TokenPrice } from '@/types'

export const useAppState = () => {
  const context = React.useContext(AppContext)

  if (context) {
    return context
  }

  throw new Error(`useAppState must be used within a AppProvider`)
}

export const useTokenList = (): {
  tokenList: TokenInfo[]
} => {
  const { tokenList } = useAppState()
  return { tokenList }
}

export const useSwapPairInfo = (): {
  fromData: TokenData | null
  toData: TokenData | null
  updatePairInfo: (
    type: SwapInputType,
    {
      tokenInfo,
      amount
    }: {
      tokenInfo?: TokenInfo | undefined
      amount?: number | undefined
    }
  ) => void
  switchFromAndTo: () => void
} => {
  const { fromData, setFromData, toData, setToData } = useAppState()

  const updatePairInfo = useCallback(
    (type: SwapInputType, { tokenInfo, amount }: { tokenInfo?: TokenInfo; amount?: number }): void => {
      const set = type === 'from' ? setFromData : setToData
      const data = type === 'from' ? fromData : toData
      const newData = {
        tokenInfo: (typeof tokenInfo !== 'undefined' ? tokenInfo : data?.tokenInfo) as TokenInfo,
        amount: (typeof amount !== 'undefined' ? amount : data?.amount) as number
      }
      set(newData)
    },
    [fromData, toData, setFromData, setToData]
  )

  const switchFromAndTo = useCallback(() => {
    setFromData({
      tokenInfo: toData?.tokenInfo as TokenInfo,
      amount: fromData?.amount as number
    })
    setToData({
      tokenInfo: fromData?.tokenInfo as TokenInfo,
      amount: toData?.amount as number
    })
  }, [toData, fromData, setFromData, setToData])

  return { fromData, toData, updatePairInfo, switchFromAndTo }
}

export const useTokenPrice = (): {
  from: TokenPrice[''] | undefined
  to: TokenPrice[''] | undefined
  fetchTokenPrice: () => void
} => {
  const { fromData, toData, tokenPrice, fetchTokenPrice } = useAppState()
  const fromKey = fromData?.tokenInfo?.extensions?.coingeckoId as string
  const toKey = toData?.tokenInfo?.extensions?.coingeckoId as string

  return { from: tokenPrice?.[fromKey], to: tokenPrice?.[toKey], fetchTokenPrice }
}
