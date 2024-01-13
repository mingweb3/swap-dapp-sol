import React, { useCallback, useMemo, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-toastify'

import { usePrepareTransaction } from '@/hooks/usePrepareTransaction'
import { useSplTokenData, useSwapPairInfo } from '@/contexts/AppProvider/hooks'

// Components
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { Button } from '@/components/UI/Button'
import { ToastBase } from '@/components/UI/Toast'

import './styles.scss'
import { SplToken, TokenData } from '@/types'
import { Transaction } from '@solana/web3.js'
import { EnvConfig } from '@/constants/envConfig'

export const SwapButton: React.FC = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const { fromData, resetPairInfo } = useSwapPairInfo()
  const { prepareTransaction } = usePrepareTransaction()
  const { splTokenData, fetchSPLTokenData } = useSplTokenData()

  const [isBusy, setIsBusy] = useState<boolean>(false)

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

  const isInsufficientError = (fromData?.amount as number) > tokenBalance

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
      const tx = await prepareTransaction(fromData as TokenData)
      const txid = await sendTransaction(tx as Transaction, connection)
      await fetchSPLTokenData()
      resetPairInfo()
      toast(renderToastSuccess(txid), { type: 'success' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(error?.message || error, {
        type: 'error'
      })
    } finally {
      setIsBusy(false)
    }
  }, [
    isBusy,
    fromData,
    prepareTransaction,
    connection,
    sendTransaction,
    renderToastSuccess,
    fetchSPLTokenData,
    resetPairInfo
  ])

  const renderButton = useCallback((): React.ReactNode => {
    if (publicKey) {
      if (isInsufficientError) {
        return <Button disabled title={`Insufficient ${fromData?.tokenInfo.symbol}`} onClick={onSwap} />
      }

      return <Button loading={isBusy} disabled={isBusy} title={isBusy ? 'Swapping' : 'Swap'} onClick={onSwap} />
    }

    return <ConnectWalletButton />
  }, [publicKey, isBusy, isInsufficientError, fromData, onSwap])

  return <div className="swap-button">{renderButton()}</div>
}
