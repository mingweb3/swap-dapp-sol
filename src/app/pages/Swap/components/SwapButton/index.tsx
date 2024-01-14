import React, { useCallback, useMemo, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-toastify'

import { useSplTokenData, useSwapPairInfo } from '@/contexts/AppProvider/hooks'

// Components
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { Button } from '@/components/UI/Button'
import { ToastBase } from '@/components/UI/Toast'

import './styles.scss'
import { SplToken } from '@/types'
import { EnvConfig } from '@/constants/envConfig'
import { Transaction } from '@solana/web3.js'
import { AAT_TOKEN_MINT, BBT_TOKEN_MINT } from '@/constants/programs'

type Props = {
  isPrepareTx: boolean
  transaction: Transaction
  onSwapSuccess: () => void
}

export const SwapButton: React.FC<Props> = props => {
  const { isPrepareTx, transaction, onSwapSuccess } = props

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const { fromData, toData, resetPairInfo } = useSwapPairInfo()
  const { splTokenData, fetchSPLTokenData } = useSplTokenData()

  const [isBusy, setIsBusy] = useState<boolean>(false)

  const isUnsupported =
    (fromData?.tokenInfo?.address !== AAT_TOKEN_MINT.toString() &&
      fromData?.tokenInfo?.address !== BBT_TOKEN_MINT.toString()) ||
    (toData?.tokenInfo?.address !== AAT_TOKEN_MINT.toString() &&
      toData?.tokenInfo?.address !== BBT_TOKEN_MINT.toString())

  const tokenBalance = useMemo((): number => {
    const data: SplToken | undefined = splTokenData.find(
      (t: SplToken) => t?.parsedInfo?.mint === fromData?.tokenInfo?.address
    )
    if (data) {
      return data.amount
    } else {
      return 0
    }
  }, [fromData, splTokenData])

  const isInsufficientError = parseFloat(fromData?.amount as string) > tokenBalance

  const renderToastSuccess = useCallback((txId: string): JSX.Element => {
    const exploreTxUrl = `${EnvConfig.EXPLORER_SOLANA_URL}tx/${txId}?cluster=devnet`
    return (
      <ToastBase title="Transaction submitted:">
        <a target="_blank" href={exploreTxUrl}>
          View Transaction
        </a>
      </ToastBase>
    )
  }, [])

  const onSwap = useCallback(async (): Promise<void> => {
    if (isBusy) return
    try {
      setIsBusy(true)
      const txid = await sendTransaction(transaction as Transaction, connection)
      resetPairInfo()
      onSwapSuccess()
      setTimeout(fetchSPLTokenData, 2000)
      toast(renderToastSuccess(txid), { type: 'success' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(
        <ToastBase title="Swap failed">
          <div>{error?.message || error}</div>
        </ToastBase>,
        {
          type: 'error'
        }
      )
    } finally {
      setIsBusy(false)
    }
  }, [
    onSwapSuccess,
    transaction,
    isBusy,
    connection,
    sendTransaction,
    renderToastSuccess,
    resetPairInfo,
    fetchSPLTokenData
  ])

  const renderButton = useCallback((): React.ReactNode => {
    if (isPrepareTx) {
      return <Button disabled title="Loading..." />
    }

    if (publicKey) {
      if (isInsufficientError) {
        return <Button disabled title={`Insufficient ${fromData?.tokenInfo.symbol}`} />
      }

      return (
        <Button
          loading={isBusy}
          disabled={isBusy || parseFloat(fromData?.amount as string) <= 0 || isUnsupported}
          title={isUnsupported ? 'Unsupported' : isBusy ? 'Swapping' : 'Swap'}
          onClick={onSwap}
        />
      )
    }

    return <ConnectWalletButton />
  }, [isPrepareTx, publicKey, isBusy, isInsufficientError, fromData, isUnsupported, onSwap])

  return <div className="swap-button">{renderButton()}</div>
}
