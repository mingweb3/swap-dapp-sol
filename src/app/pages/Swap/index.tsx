import * as React from 'react'
import { Helmet } from 'react-helmet-async'

import { Box } from '@radix-ui/themes'

// Components
import { SwitchIcon } from '@/components/Svg/Switch'
import { SwapInput } from './components/SwapInput'
import { EstimatedFee } from './components/EstimatedFee'
import { SwapButton } from './components/SwapButton'

import './styles.scss'
import { SwapPairInfo } from './components/SwapPairInfo'

export const SwapPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Swap Page</title>
        <meta name="description" content="This is SwapPage" />
      </Helmet>
      <div className="swap-page__container">
        <Box p="2" className="swap-wrapper">
          <div className="swap-wrapper__inner">
            <div className="swap-wrapper__header">
              <div className="swap-header__title">Swap</div>
            </div>
            <div className="swap-input__group">
              <SwapInput type="from" />
              <div className="swap-wrapper__switch-btn">
                <SwitchIcon />
              </div>
              <SwapInput type="to" />
            </div>
            <EstimatedFee />
            <SwapButton />
          </div>
        </Box>
        <SwapPairInfo />
      </div>
    </>
  )
}
