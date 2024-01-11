import React from 'react'
import { Avatar } from '@/components/UI/Avatar'

import './styles/select-token.styles.scss'
import { TokenInfo } from '@solana/spl-token-registry'

type Props = {
  tokenInfo: TokenInfo | undefined
  onClick: () => void
}

export const SelectTokenButton: React.FC<Props> = props => {
  const { tokenInfo, onClick } = props
  const { symbol, logoURI } = tokenInfo || {}
  return (
    <div className="swap-input__select-token" onClick={onClick}>
      <Avatar src={logoURI} alt={symbol} className="select-token__token-logo" />
      <div className="select-token__token-name">{symbol}</div>
      <img className="select-token__dropdown" src="/images/icons/chevron-down.svg" alt="chevron-down.svg" />
    </div>
  )
}
