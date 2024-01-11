import React, { useCallback, useState } from 'react'
import { SelectTokenButton } from './SelectTokenButton'

import './styles/swap-input.styles.scss'
import { TokenListModal } from '../TokenListModal'
import { SwapInputType, TokenData } from '@/types'
import { TokenInfo } from '@solana/spl-token-registry'

type Props = {
  type: SwapInputType
  tokenData: TokenData | null
  onAmountChange: React.ChangeEventHandler<HTMLInputElement> | undefined
  onTokenChange: (tokenInfo: TokenInfo) => void
}

export const SwapInput: React.FC<Props> = props => {
  const { type, tokenData, onAmountChange, onTokenChange } = props

  const [open, setOpen] = useState<boolean>(false)

  const toggleTokenListModal = useCallback((): void => {
    setOpen(prev => !prev)
  }, [])

  return (
    <>
      <div className="swap-input">
        <div className="swap-input__label">{type === 'from' ? 'You pay' : 'You receive'}</div>
        <div className="swap-input__ipt-wrapper">
          <div className="swap-amount-ipt-wrapper">
            {type === 'from' ? <input placeholder="0" pattern="[0-9]*" onChange={onAmountChange} /> : <span>0</span>}
            {(tokenData?.amount as number) > 0 && <div className="swap-input__total-usd">$104.23</div>}
          </div>
          <SelectTokenButton tokenInfo={tokenData?.tokenInfo} onClick={toggleTokenListModal} />
        </div>
      </div>
      <TokenListModal
        open={open}
        onClose={toggleTokenListModal}
        onSelectToken={(tokenInfo: TokenInfo) => {
          onTokenChange(tokenInfo)
          toggleTokenListModal()
        }}
      />
    </>
  )
}
