import * as token from '@solana/spl-token'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
// import { TOKEN_SWAP_PROGRAM_ID } from '@/libs/token-swap'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useCallback } from 'react'
import * as Web3 from '@solana/web3.js'
import {
  AAT_POOL_TOKEN_ACCOUNT,
  AAT_TOKEN_MINT,
  BBT_POOL_TOKEN_ACCOUNT,
  BBT_TOKEN_MINT,
  POOL_TOKEN_FEE_ACCOUNT,
  POOL_TOKEN_MINT,
  SWAP_POOL_AUTHORITY,
  TOKEN_SWAP_STATE_ACCOUNT
} from '@/constants/programs'
import { TokenData } from '@/types'
import { swapInstruction } from '@/utils/helper.solWeb3'

export const usePrepareTransaction = () => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const prepareTransaction = useCallback(
    async (fromData: TokenData): Promise<Web3.Transaction | null> => {
      if (!publicKey) return null

      const AATMintInfo = await token.getMint(connection, AAT_TOKEN_MINT)
      const BBTMintInfo = await token.getMint(connection, BBT_TOKEN_MINT)

      const AATTokenATA = await token.getAssociatedTokenAddress(AAT_TOKEN_MINT, publicKey)
      const BBTTokenATA = await token.getAssociatedTokenAddress(BBT_TOKEN_MINT, publicKey)
      const tokenAccountPool = await token.getAssociatedTokenAddress(POOL_TOKEN_MINT, publicKey)

      const transaction = new Web3.Transaction()

      const account = await connection.getAccountInfo(tokenAccountPool)

      if (account == null) {
        const createATAInstruction = token.createAssociatedTokenAccountInstruction(
          publicKey,
          tokenAccountPool,
          publicKey,
          POOL_TOKEN_MINT
        )
        transaction.add(createATAInstruction)
      }

      const decimals =
        fromData.tokenInfo.address === AAT_TOKEN_MINT.toString() ? AATMintInfo.decimals : BBTMintInfo.decimals
      const amount = (fromData.amount as number) * 10 ** decimals

      const instruction = swapInstruction(
        TOKEN_SWAP_STATE_ACCOUNT,
        SWAP_POOL_AUTHORITY,
        publicKey,
        fromData.tokenInfo.address === AAT_TOKEN_MINT.toString() ? AATTokenATA : BBTTokenATA,
        fromData.tokenInfo.address === AAT_TOKEN_MINT.toString() ? AAT_POOL_TOKEN_ACCOUNT : BBT_POOL_TOKEN_ACCOUNT,
        fromData.tokenInfo.address === AAT_TOKEN_MINT.toString() ? BBT_POOL_TOKEN_ACCOUNT : AAT_POOL_TOKEN_ACCOUNT,
        fromData.tokenInfo.address === AAT_TOKEN_MINT.toString() ? BBTTokenATA : AATTokenATA,
        POOL_TOKEN_MINT,
        POOL_TOKEN_FEE_ACCOUNT,
        null,
        new Web3.PublicKey('SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8'),
        TOKEN_PROGRAM_ID,
        amount as unknown as bigint,
        0 as unknown as bigint
      )
      transaction.add(instruction)

      return transaction
    },
    [connection, publicKey]
  )

  return { prepareTransaction }
}
