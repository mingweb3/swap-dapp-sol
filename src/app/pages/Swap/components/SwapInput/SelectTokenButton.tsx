import React from 'react'
import { Avatar } from '@/components/UI/Avatar'

import './styles/select-token.styles.scss'

type Props = {
  onClick: () => void
}

export const SelectTokenButton: React.FC<Props> = props => {
  const { onClick } = props
  return (
    <div className="swap-input__select-token" onClick={onClick}>
      <Avatar className="select-token__token-logo" />
      <div className="select-token__token-name">SOL</div>
      <img className="select-token__dropdown" src="/images/icons/chevron-down.svg" alt="chevron-down.svg" />
    </div>
  )
}
