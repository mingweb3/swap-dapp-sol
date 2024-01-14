import { WalletContextState } from '@solana/wallet-adapter-react'
import { Connection, LAMPORTS_PER_SOL, PublicKey, TransactionInstruction } from '@solana/web3.js'
import * as token from '@solana/spl-token'
import { SplToken, SwapInstruction } from '@/types'
import { struct, u8 } from '@solana/buffer-layout'
import { u64 } from '../libs/buffer-layout-utils'

export const getSPLTokenData = async (wallet: WalletContextState, connection: Connection): Promise<SplToken[]> => {
  if (!wallet.connected) {
    return []
  }
  const res = await connection.getParsedTokenAccountsByOwner(
    wallet.publicKey!,
    {
      programId: new PublicKey(token.TOKEN_PROGRAM_ID)
    },
    'confirmed'
  )
  // Get all SPL tokens owned by connected wallet
  const data = await connection.getAccountInfo(wallet.publicKey!)

  const list = res.value.map(item => {
    const token = {
      pubkey: item.pubkey.toBase58(),
      parsedInfo: item.account.data.parsed.info,
      amount:
        item.account.data.parsed.info.tokenAmount.amount / 10 ** item.account.data.parsed.info.tokenAmount.decimals
    }
    // Filter out empty account
    if (item.account.data.parsed.info.tokenAmount.decimals === 0) {
      return undefined
    } else {
      return token
    }
  })

  // Add SOL into list
  list.push({
    pubkey: wallet.publicKey?.toBase58() as string,
    parsedInfo: {
      mint: data?.owner.toBase58()
    },
    amount: (data?.lamports as number) / LAMPORTS_PER_SOL
  })
  return list as SplToken[]
}

export const swapInstruction = (
  tokenSwap: PublicKey,
  authority: PublicKey,
  userTransferAuthority: PublicKey,
  userSource: PublicKey,
  poolSource: PublicKey,
  poolDestination: PublicKey,
  userDestination: PublicKey,
  poolMint: PublicKey,
  feeAccount: PublicKey,
  hostFeeAccount: PublicKey | null,
  swapProgramId: PublicKey,
  tokenProgramId: PublicKey,
  amountIn: bigint,
  minimumAmountOut: bigint
): TransactionInstruction => {
  const dataLayout = struct<SwapInstruction>([u8('instruction'), u64('amountIn'), u64('minimumAmountOut')])

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 1, // Swap instruction
      amountIn,
      minimumAmountOut
    },
    data
  )
  const keys = [
    { pubkey: tokenSwap, isSigner: false, isWritable: false },
    { pubkey: authority, isSigner: false, isWritable: false },
    { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
    { pubkey: userSource, isSigner: false, isWritable: true },
    { pubkey: poolSource, isSigner: false, isWritable: true },
    { pubkey: poolDestination, isSigner: false, isWritable: true },
    { pubkey: userDestination, isSigner: false, isWritable: true },
    { pubkey: poolMint, isSigner: false, isWritable: true },
    { pubkey: feeAccount, isSigner: false, isWritable: true },
    { pubkey: tokenProgramId, isSigner: false, isWritable: false }
  ]
  if (hostFeeAccount !== null) {
    keys.push({ pubkey: hostFeeAccount, isSigner: false, isWritable: true })
  }
  return new TransactionInstruction({
    keys,
    programId: swapProgramId,
    data
  })
}
