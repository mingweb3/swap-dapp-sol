import React, { useMemo } from 'react'
import { SelectTokenButton } from './SelectTokenButton'

import './styles/swap-input.styles.scss'
import { SplToken, SwapInputType, TokenData, TokenPrice } from '@/types'
import { formatNumber } from '@/utils/formatNumber'
import { useSplTokenData } from '@/contexts/AppProvider/hooks'

type Props = {
  type: SwapInputType
  tokenData: TokenData | null
  tokenPrice: TokenPrice[''] | undefined
  onAmountChange: React.ChangeEventHandler<HTMLInputElement> | undefined
  onOpenTokenList: (type: SwapInputType) => void
}

export const SwapInput: React.FC<Props> = props => {
  const { type, tokenData, tokenPrice, onAmountChange, onOpenTokenList } = props

  const { splTokenData } = useSplTokenData()

  const totalUsdValue = useMemo((): number => {
    if (tokenData?.amount && tokenPrice?.usd) {
      return tokenData.amount * tokenPrice.usd
    }

    return 0
  }, [tokenData, tokenPrice])

  const tokenBalance = useMemo((): number => {
    const data: SplToken | undefined = splTokenData.find(
      (t: SplToken) => t?.parsedInfo?.mint === tokenData?.tokenInfo?.address
    )
    if (data) {
      return data.amount
    } else {
      return 0
    }
  }, [tokenData, splTokenData])

  return (
    <>
      <div className="swap-input">
        <div className="swap-input__label">
          {type === 'from' ? (
            <PayLabel balance={tokenBalance} symbol={tokenData?.tokenInfo?.symbol as string} />
          ) : (
            'You receive'
          )}
        </div>
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
              <span>0</span>
            )}
            <div className="swap-input__total-usd">{`${
              totalUsdValue > 0 ? `$${formatNumber(`${totalUsdValue}`)}` : '--'
            }`}</div>
          </div>
          <SelectTokenButton tokenInfo={tokenData?.tokenInfo} onClick={() => onOpenTokenList(type)} />
        </div>
      </div>
    </>
  )
}

const PayLabel: React.FC<{ balance: number; symbol: string }> = props => {
  return (
    <span className="p-lbl">
      You pay{' '}
      {props.balance > 0 && (
        <small>
          (Max: {props.balance} {props.symbol})
        </small>
      )}
    </span>
  )
}
