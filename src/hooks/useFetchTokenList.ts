import { useEffect, useState } from 'react'
import { TokenInfo } from '@solana/spl-token-registry'
import { EnvConfig } from '@/constants/envConfig'
import { DEFAULT_FROM_DATA, DEFAULT_TO_DATA } from '@/constants'

export const useFetchTokenList = (): {
  tokenList: TokenInfo[]
} => {
  const [tokenList, setTokenList] = useState<TokenInfo[]>([])

  useEffect((): void => {
    const fetchTokenList = async (): Promise<void> => {
      const res = await fetch(EnvConfig.JUP_STRICT_LIST_URL)
      const list = await res.json()
      // eslint-disable-next-line no-unsafe-optional-chaining
      setTokenList([DEFAULT_FROM_DATA.tokenInfo, DEFAULT_TO_DATA.tokenInfo, ...list?.slice(0, 100)])
    }

    fetchTokenList()
  }, [])

  return { tokenList }
}
