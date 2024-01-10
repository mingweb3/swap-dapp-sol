/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import * as Web3 from '@solana/web3.js'
import * as token from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import AirdropSchema from '@/models/airdrop'
import { AIRDROP_PDA, AIRDROP_PROGRAM_ID } from '@/constants/programs'
import './styles.scss'

interface TokenAirdropProps {
  title: string
  tokenMintAddress: Web3.PublicKey
}

export const TokenAirdrop: React.FC<TokenAirdropProps> = ({title, tokenMintAddress}) => {
  // Connect & Wallet
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  // Token amount
  const [amount, setAmount] = useState(0)

  // Submit FORM
  const handleAATSubmit = (event: any) => {
    event.preventDefault()
    const airdrop = new AirdropSchema(amount)
    handleAATTnxSubmit(airdrop)
  }

  const handleAATTnxSubmit = async (airdrop: AirdropSchema) => {
    if (!publicKey) {
      alert('Please connect your wallet!')
      return
    }
    const transaction = new Web3.Transaction()

    const userATA = await token.getAssociatedTokenAddress(tokenMintAddress, publicKey)
    const account = await connection.getAccountInfo(userATA)

    if (account == null) {
      const createATAIX = await token.createAssociatedTokenAccountInstruction(
        publicKey,
        userATA,
        publicKey,
        tokenMintAddress
      )
      transaction.add(createATAIX)
    }

    const buffer = airdrop.serialize()

    const airdropIX = new Web3.TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: true
        },
        {
          pubkey: userATA,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: tokenMintAddress,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: AIRDROP_PDA,
          isSigner: false,
          isWritable: false
        },
        {
          pubkey: token.TOKEN_PROGRAM_ID,
          isSigner: false,
          isWritable: false
        }
      ],
      data: buffer,
      programId: AIRDROP_PROGRAM_ID
    })

    transaction.add(airdropIX)

    try {
      const txid = await sendTransaction(transaction, connection)
      alert(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
      console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
    } catch (e) {
      console.log(JSON.stringify(e))
      alert(JSON.stringify(e))
    }
  }

  return (
    <Flex className="token-airdrop_block" gap={'3'}>
      <Form.Root className="FormRoot" onSubmit={handleAATSubmit}>
        <Form.Field className="FormField" name="tokenAmount">
          <Text size="4">
            {title} <Text size="1">(Limit 1 - 100)</Text>
          </Text>
          <div className="flex gap-6">
            <Form.Control asChild>
              <input
                onChange={e => setAmount(parseInt(e.target.value))}
                className="Input"
                type="number"
                min={1}
                max={100}
                required
              />
            </Form.Control>
            <button type="submit" className="Button">
              Claim
            </button>
          </div>
        </Form.Field>
      </Form.Root>
    </Flex>
  )
}
