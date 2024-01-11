import * as React from 'react'
import { Helmet } from 'react-helmet-async'

import { TokenAirdrop } from './components/TokenAirdrop'
import { AAT_TOKEN_MINT, BBT_TOKEN_MINT } from '@/constants/programs'
import { Box, Flex } from '@radix-ui/themes'
import { useWallet } from '@solana/wallet-adapter-react'

import './styles.scss'
import { useEffect } from 'react'
import { useTokenWallet } from '@/hooks/useTokenWallet'

export const AirdropPage: React.FC = () => {
  const { publicKey } = useWallet()
  const { tokenWallet, getTokenBalanceUI } = useTokenWallet()

  useEffect(() => {
    if (publicKey) {
      getTokenBalanceUI(AAT_TOKEN_MINT, 'AAT')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey])

  useEffect(() => {
    if (tokenWallet) {
      console.log(tokenWallet)
    }
  }, [tokenWallet])

  return (
    <>
      <Helmet>
        <title>Airdrop token AAT & BBT</title>
        <meta name="description" content="Airdrop token AAT & BBT. Using devnet on Solana" />
      </Helmet>
      <Box py={'8'} className="page pg-container">
        <div className="pg-inner">
          <h3 className="head-3 text-white">
            Airdrop token to test <span className="text-12">(devnet only)</span>
          </h3>
          <Flex className="airdrop-form__wrapper" direction={'column'} gap={'6'}>
            <TokenAirdrop title="Get AAT" tokenMintAddress={AAT_TOKEN_MINT} tokenMintShort="DWi...73Dh" />
            <TokenAirdrop title="Get BBT" tokenMintAddress={BBT_TOKEN_MINT} tokenMintShort="4AG...nRQ" />
            <p>
              *This is a temporary page, not for the test.
              <br />
              Just for supporting to get token for testing swap func.
              <br />
              Dont test this page, please just get tokens.
            </p>
          </Flex>
        </div>
      </Box>
    </>
  )
}
