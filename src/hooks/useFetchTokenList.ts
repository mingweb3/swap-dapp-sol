import { useEffect, useState } from 'react'
import { TokenListProvider, TokenInfo, ENV } from '@solana/spl-token-registry'

export const useFetchTokenList = () => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map())

  useEffect(() => {
    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByChainId(ENV.Devnet).getList()
      setTokenMap(
        tokenList.reduce((map, item) => {
          map.set(item.address, item)
          return map
        }, new Map())
      )
    })
  }, [])

  return { tokenList: tokenMap }
}
