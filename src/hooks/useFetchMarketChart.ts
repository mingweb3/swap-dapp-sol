import { EnvConfig } from '@/constants/envConfig'
import { TokenPrice } from '@/types'
import { useCallback, useState } from 'react'

export const useFetchMarketChart = () => {
  const [marketChart, setMarketChart] = useState<TokenPrice | null>(null)

  const fetchMarketChart = useCallback(async (tokenId: string): Promise<void> => {
    const res = await fetch(
      `${EnvConfig.COINGECKO_V3_API_URL}coins/${tokenId}/market_chart?vs_currency=usd&days=1&interval=`
    )
    const data = await res.json()
    setMarketChart(data)
  }, [])

  return { marketChart, fetchMarketChart }
}
