import * as React from 'react'
import { Helmet } from 'react-helmet-async'

import './styles.scss'
import { TokenAirdrop } from './components/TokenAirdrop'
import { AAT_TOKEN_MINT, BBT_TOKEN_MINT } from '@/constants/programs'
import { Box } from '@radix-ui/themes'

export const AirdropPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Airdrop token AAT & BBT</title>
        <meta name="description" content="Airdrop token AAT & BBT. Using devnet on Solana" />
      </Helmet>
      <Box py={"8"} className="page pg-container">
        <div className="pg-inner">
          <h3 className="head-3 text-white">
            Airdrop token to test <span className="text-12">(devnet only)</span>
          </h3>
          <div className="flex col gap-8">
            <TokenAirdrop title="Get AAT" tokenMintAddress={AAT_TOKEN_MINT} />
            <TokenAirdrop title="Get BBT" tokenMintAddress={BBT_TOKEN_MINT} />
          </div>
          <p>
            *This is a temporary page not for the test. Just help to get token for testing. Dont test this page, just
            get token.
          </p>
        </div>
      </Box>
    </>
  )
}