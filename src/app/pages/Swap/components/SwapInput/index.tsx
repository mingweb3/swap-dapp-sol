import React, { useCallback, useState } from 'react'
import { SelectTokenButton } from './SelectTokenButton'

import './styles/swap-input.styles.scss'
import { TokenListModal } from '../TokenListModal'

type Props = {
  type: 'from' | 'to'
}

export const SwapInput: React.FC<Props> = props => {
  const { type } = props

  const [open, setOpen] = useState<boolean>(false)

  const toggleTokenListModal = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  return (
    <>
      <div className="swap-input">
        <div className="swap-input__label">
          {type === 'from' ? <PayLabel /> : 'You receive'}</div>
        <div className="swap-input__ipt-wrapper">
          <div className="swap-amount-ipt-wrapper">
            {type === 'from' ? <input placeholder="0" /> : <span>0</span>}
            <div className="swap-input__total-usd">$104.23</div>
          </div>
          <SelectTokenButton onClick={toggleTokenListModal} />
        </div>
      </div>

      <TokenListModal open={open} onClose={toggleTokenListModal} />
    </>
  )
}

const PayLabel: React.FC = () => {
  return (
    <span className="p-lbl">You pay <small>(Max: 12.22 AAT)</small></span>
  )
}