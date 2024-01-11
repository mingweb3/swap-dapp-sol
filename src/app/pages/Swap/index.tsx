import React, { ChangeEvent, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'

import { Box } from '@radix-ui/themes'

// Components
import { SwitchIcon } from '@/components/Svg/Switch'
import { SwapInput } from './components/SwapInput'
import { EstimatedFee } from './components/EstimatedFee'
import { SwapButton } from './components/SwapButton'
import { SwapPairInfo } from './components/SwapPairInfo'

import './styles.scss'
import { useSwapPairInfo, useTokenPrice } from '@/contexts/AppProvider/hooks'
import { SwapInputType } from '@/types'
import { TokenInfo } from '@solana/spl-token-registry'

export const SwapPage: React.FC = () => {
  const { fromData, toData, updatePairInfo } = useSwapPairInfo()
  const { fetchTokenPrice } = useTokenPrice()

  const onAmountChange = useCallback(
    (type: SwapInputType, e: ChangeEvent<HTMLInputElement>): void => {
      updatePairInfo(type, { amount: +e.target.value })
    },
    [updatePairInfo]
  )

  const onTokenChange = useCallback(
    (type: SwapInputType, tokenInfo: TokenInfo): void => {
      updatePairInfo(type, { tokenInfo })
      setTimeout(fetchTokenPrice, 500)
    },
    [updatePairInfo, fetchTokenPrice]
  )

  return (
    <>
      <Helmet>
        <title>Swap Page</title>
        <meta name="description" content="This is SwapPage" />
      </Helmet>
      <div className="swap-page__container">
        <Box className="swap-shadow__wrapper">
          <Box p="2" className="swap-wrapper">
            <div className="swap-wrapper__inner">
              <div className="swap-wrapper__header">
                <div className="swap-header__title">Swap</div>
              </div>
              <div className="swap-input__group">
                <SwapInput
                  type="from"
                  tokenData={fromData}
                  onAmountChange={e => onAmountChange('from', e)}
                  onTokenChange={tokenInfo => onTokenChange('from', tokenInfo)}
                />
                <div className="swap-wrapper__switch-btn">
                  <SwitchIcon />
                </div>
                <SwapInput
                  type="to"
                  tokenData={toData}
                  onAmountChange={e => onAmountChange('to', e)}
                  onTokenChange={tokenInfo => onTokenChange('to', tokenInfo)}
                />
              </div>
              <EstimatedFee fromData={fromData} toData={toData} />
              <SwapButton />
            </div>
          </Box>
        </Box>
        <SwapPairInfo fromData={fromData} toData={toData} />
      </div>
    </>
  )
}
