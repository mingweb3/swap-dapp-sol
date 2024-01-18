import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDebounce } from 'use-debounce'

import { Box } from '@radix-ui/themes'

// Components
import { SwitchIcon } from '@/components/Svg/Switch'
import { SwapInput } from './components/SwapInput'
import { EstimatedFee } from './components/EstimatedFee'
import { SwapButton } from './components/SwapButton'
import { SwapPairInfo } from './components/SwapPairInfo'

import './styles.scss'
import { useSwapPairInfo, useTokenPrice } from '@/contexts/AppProvider/hooks'
import { SwapInputType, TokenData } from '@/types'
import { TokenInfo } from '@solana/spl-token-registry'
import { TokenListModal } from './components/TokenListModal'
import { Transaction } from '@solana/web3.js'
import { usePrepareTransaction } from '@/hooks/usePrepareTransaction'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { unformatNumber } from '@/utils/unformatNumber'
import { estimatedReceived } from '@/utils/estimatedReceived'

export const SwapPage: React.FC = () => {
  const wallet = useWallet()
  const { connection } = useConnection()
  const { fromData, toData, updatePairInfo, switchFromAndTo } = useSwapPairInfo()
  const { from: fromTokenPrice, to: toTokenPrice } = useTokenPrice()
  const { prepareTransaction } = usePrepareTransaction()

  const [openTokenListModal, setOpenTokenListModal] = useState<boolean>(false)
  const [selectType, setSelectType] = useState<SwapInputType | null>(null)
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [isPrepareTx, setIsPrepareTx] = useState<boolean>(false)
  const [txFee, setTxFee] = useState<number | null>(null)

  const [debounceFromDataAmount] = useDebounce(fromData?.amount, 500)

  useEffect(() => {
    if (parseFloat(debounceFromDataAmount as string) > 0 && wallet.connected) {
      setIsPrepareTx(true)
      prepareTransaction(fromData as TokenData).then(setTransaction)
    } else {
      setIsPrepareTx(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromData?.tokenInfo, debounceFromDataAmount, wallet.connected])

  useEffect(() => {
    if (transaction) {
      transaction
        ?.getEstimatedFee(connection)
        .then(setTxFee)
        .finally(() => setIsPrepareTx(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction])

  useEffect(() => {
    if (wallet.connected) {
      updatePairInfo('to', { amount: estimatedReceived(fromData as TokenData, toData as TokenData) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromData, toData?.tokenInfo, wallet.connected])

  const toggleTokenListModal = useCallback((type: typeof selectType): void => {
    setSelectType(type)
    setOpenTokenListModal(prev => !prev)
  }, [])

  const onAmountChange = useCallback(
    (type: SwapInputType, e: ChangeEvent<HTMLInputElement>): void => {
      const amountInput = e.target.value
      if (!/[^0-9,.]|(\.[^.]*\.)/.test(amountInput)) {
        updatePairInfo(type, { amount: unformatNumber(amountInput) })
        setTxFee(null)
      }
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
              <EstimatedFee fromData={fromData} toData={toData} isPrepareTx={isPrepareTx} fee={txFee} />
              <SwapButton
                isPrepareTx={isPrepareTx}
                transaction={transaction as Transaction}
                onSwapSuccess={() => {
                  setTxFee(null)
                  setTransaction(null)
                }}
              />
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
