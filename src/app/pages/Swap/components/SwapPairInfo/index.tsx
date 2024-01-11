import React, { memo } from 'react'
import './styles.scss'
import { TokenListItem } from '@/components/TokenListItem'
import { TokenData } from '@/types'
import { TokenInfo } from '@solana/spl-token-registry'
import { useTokenPrice } from '@/contexts/AppProvider/hooks'

type Props = {
  fromData: TokenData | null
  toData: TokenData | null
}

export const SwapPairInfo: React.FC<Props> = memo(
  props => {
    const { fromData, toData } = props
    const { from, to } = useTokenPrice()

    if (!fromData && !toData) return

    return (
      <div className="swap-pair-info">
        <TokenListItem
          tokenInfo={fromData?.tokenInfo as TokenInfo}
          tokenPrice={from?.usd}
          percentChange={from?.usd_24h_change}
        />
        <TokenListItem
          tokenInfo={toData?.tokenInfo as TokenInfo}
          tokenPrice={to?.usd}
          percentChange={to?.usd_24h_change}
        />
      </div>
    )
  },
  (prevProps, nextProps) => prevProps.fromData === nextProps.fromData && prevProps.toData === nextProps.toData
)
