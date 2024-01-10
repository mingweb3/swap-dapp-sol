import React from 'react'
import './styles.scss'
import { TokenListItem } from '@/components/TokenListItem'

export const SwapPairInfo: React.FC = () => {
  return (
    <div className="swap-pair-info">
      <TokenListItem showPriceInfo />
      <TokenListItem showPriceInfo />
    </div>
  )
}
