import { EnvConfig } from '@/constants/envConfig'
import { TokenPrice } from '@/types'
import { useCallback } from 'react'

export const useFetchTokenPrice = (): {
  fetchTokenPrice: (tokenIds: string[]) => Promise<TokenPrice>
} => {
  const fetchTokenPrice = useCallback(async (tokenIds: string[]): Promise<TokenPrice> => {
    const res = await fetch(
      `${EnvConfig.COINGECKO_V3_API_URL}simple/price?ids=${tokenIds.join(
        ','
      )}&vs_currencies=usd&include_24hr_change=true`
    )
    const price = await res.json()
    return price
  }, [])

  return { fetchTokenPrice }
}
