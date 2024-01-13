import React, { ChangeEvent, useCallback, useState } from 'react'
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
import { TokenListModal } from './components/TokenListModal'

export const SwapPage: React.FC = () => {
  const { fromData, toData, updatePairInfo, switchFromAndTo } = useSwapPairInfo()
  const { from: fromTokenPrice, to: toTokenPrice } = useTokenPrice()

  const [openTokenListModal, setOpenTokenListModal] = useState<boolean>(false)
  const [selectType, setSelectType] = useState<SwapInputType | null>(null)

  const toggleTokenListModal = useCallback((type: typeof selectType): void => {
    setSelectType(type)
    setOpenTokenListModal(prev => !prev)
  }, [])

  const onAmountChange = useCallback(
    (type: SwapInputType, e: ChangeEvent<HTMLInputElement>): void => {
      const amount = e.target.value.replace(/[^0-9.]/g, '')
      updatePairInfo(type, { amount: +amount })
    },
    [updatePairInfo]
  )

  const onTokenChange = useCallback(
    (type: SwapInputType, tokenInfo: TokenInfo): void => {
      if (
        (type === 'from' && tokenInfo.address === toData?.tokenInfo.address) ||
        (type === 'to' && tokenInfo.address === fromData?.tokenInfo.address)
      ) {
        switchFromAndTo()
      } else {
        updatePairInfo(type, { tokenInfo })
      }
    },
    [updatePairInfo, switchFromAndTo, fromData, toData]
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
                  tokenPrice={fromTokenPrice}
                  onAmountChange={(e: ChangeEvent<HTMLInputElement>) => onAmountChange('from', e)}
                  onOpenTokenList={toggleTokenListModal}
                />
                <div className="swap-wrapper__switch-btn" onClick={switchFromAndTo}>
                  <SwitchIcon />
                </div>
                <SwapInput
                  type="to"
                  tokenData={toData}
                  tokenPrice={toTokenPrice}
                  onAmountChange={(e: ChangeEvent<HTMLInputElement>) => onAmountChange('to', e)}
                  onOpenTokenList={toggleTokenListModal}
                />
              </div>
              <EstimatedFee fromData={fromData} toData={toData} />
              <SwapButton />
            </div>
          </Box>
        </Box>
        <SwapPairInfo fromData={fromData} toData={toData} />
      </div>

      <TokenListModal
        open={openTokenListModal && !!selectType}
        onClose={() => toggleTokenListModal(null)}
        onSelectToken={(tokenInfo: TokenInfo) => {
          onTokenChange(selectType as SwapInputType, tokenInfo)
          toggleTokenListModal(null)
        }}
      />
    </>
  )
}
