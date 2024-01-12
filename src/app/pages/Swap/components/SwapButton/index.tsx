import React, { useCallback } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import { usePrepareTransaction } from '@/hooks/usePrepareTransaction'

// Components
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { Button } from '@/components/UI/Button'

import './styles.scss'
import { useSwapPairInfo } from '@/contexts/AppProvider/hooks'
import { TokenData } from '@/types'
import { Transaction } from '@solana/web3.js'

export const SwapButton: React.FC = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const { fromData } = useSwapPairInfo()
  const { prepareTransaction } = usePrepareTransaction()

  const onSwap = useCallback(async () => {
    try {
      const tx = await prepareTransaction(fromData as TokenData)
      const txid = await sendTransaction(tx as Transaction, connection)
      alert(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
      console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
    } catch (error) {
      console.log(error)
    }
  }, [fromData, prepareTransaction, connection, sendTransaction])

  return (
    <div className="swap-button">{publicKey ? <Button title="Swap" onClick={onSwap} /> : <ConnectWalletButton />}</div>
  )
}
