import { useEffect, useState } from 'react'
import { TokenInfo } from '@solana/spl-token-registry'
import { EnvConfig } from '@/constants/envConfig'

export const useFetchTokenList = (): {
  tokenList: TokenInfo[]
} => {
  const [tokenList, setTokenList] = useState<TokenInfo[]>([])

  useEffect((): void => {
    const fetchTokenList = async (): Promise<void> => {
      const res = await fetch(EnvConfig.JUP_STRICT_LIST_URL)
      const list = await res.json()
      setTokenList(list)
    }

    fetchTokenList()
  }, [])

  return { tokenList }
}
