import React, { useMemo } from 'react'
import { SelectTokenButton } from './SelectTokenButton'

import './styles/swap-input.styles.scss'
import { SwapInputType, TokenData, TokenPrice } from '@/types'
import { formatNumber } from '@/utils/formatNumber'

type Props = {
  type: SwapInputType
  tokenData: TokenData | null
  tokenPrice: TokenPrice[''] | undefined
  onAmountChange: React.ChangeEventHandler<HTMLInputElement> | undefined
  onOpenTokenList: (type: SwapInputType) => void
}

export const SwapInput: React.FC<Props> = props => {
  const { type, tokenData, tokenPrice, onAmountChange, onOpenTokenList } = props

  const totalUsdValue = useMemo((): number => {
    if (tokenData?.amount && tokenPrice?.usd) {
      return tokenData.amount * tokenPrice.usd
    }

    return 0
  }, [tokenData, tokenPrice])

  console.log(formatNumber(`${tokenData?.amount}`))

  return (
    <>
      <div className="swap-input">
        <div className="swap-input__label">{type === 'from' ? <PayLabel /> : 'You receive'}</div>
        <div className="swap-input__ipt-wrapper">
          <div className="swap-amount-ipt-wrapper">
            {type === 'from' ? (
              <input
                value={(tokenData?.amount as number) > 0 ? `${tokenData?.amount}` : ''}
                placeholder="0.00"
                pattern="[0-9]*"
                onChange={onAmountChange}
              />
            ) : (
              <span></span>
            )}
            {totalUsdValue > 0 && <div className="swap-input__total-usd">${formatNumber(`${totalUsdValue}`)}</div>}
          </div>
          <SelectTokenButton tokenInfo={tokenData?.tokenInfo} onClick={() => onOpenTokenList(type)} />
        </div>
      </div>
    </>
  )
}

const PayLabel: React.FC = () => {
  return (
    <span className="p-lbl">
      You pay <small>(Max: 12.22 AAT)</small>
    </span>
  )
}
