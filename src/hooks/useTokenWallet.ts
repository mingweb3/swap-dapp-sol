import { PublicKey } from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useState } from 'react'

export interface TokenWalletUI {
  address: string
  amountUI: number
  amount: bigint
  symbol: string
}

export const useTokenWallet = () => {
  const [tokenWallet, setTokenWallet] = useState<TokenWalletUI>()

  const { connection } = useConnection()
  const { publicKey } = useWallet()

  const getTokenBalance = async (tokenMint: PublicKey) => {
    if (!publicKey) {
      alert('Please connect your wallet!')
      return
    }

    // convert tokenMint to str
    const tokenMintPublicKey = new PublicKey(tokenMint).toBase58()

    // get all tokenAcc in Owner's Wallet
    const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID
    })

    // Find specific token
    const specTokenAccount = tokenAccounts.value.find(tokenAccount => {
      const accountData = AccountLayout.decode(tokenAccount.account.data)
      const curAdd: string = new PublicKey(accountData.mint).toBase58()

      if (tokenMintPublicKey === curAdd) return true
      return false
    })

    return specTokenAccount
  }

  const getTokenBalanceWeb3 = async (tokenAccount: PublicKey) => {
    const info = await connection.getTokenAccountBalance(tokenAccount)
    if (!info.value.uiAmount) throw new Error('No balance found')
    // console.log('Balance (using Solana-Web3.js): ', info.value.uiAmount)
    return info.value.uiAmount || undefined
  }

  const getTokenBalanceUI = async (tokenMint: PublicKey, symbol: string) => {
    const tokenMintPublicKey = new PublicKey(tokenMint).toBase58()
    const specTokenAccount = await getTokenBalance(tokenMint)
    if (!specTokenAccount) {
      return
    }
    const accountData = AccountLayout.decode(specTokenAccount.account.data)
    //  Convert data to UI
    const uiAmount = await getTokenBalanceWeb3(new PublicKey(specTokenAccount.pubkey))
    // console.log('tokenBalanceAmount', {
    //   address: tokenMintPublicKey,
    //   amountUI: uiAmount,
    //   amount: accountData.amount,
    //   symbol
    // })

    setTokenWallet({
      address: tokenMintPublicKey,
      amountUI: uiAmount || 0,
      amount: accountData.amount,
      symbol
    })
  }
  return { tokenWallet, getTokenBalanceWeb3, getTokenBalance, getTokenBalanceUI }
}
