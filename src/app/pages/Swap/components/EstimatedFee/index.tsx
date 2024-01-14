import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { TokenData } from '@/types'
import Skeleton from 'react-loading-skeleton'

import './styles.scss'
import { formatNumber } from '@/utils/formatNumber'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

type Props = {
  fromData: TokenData | null
  toData: TokenData | null
  isPrepareTx: boolean
  fee: number | null
}

export const EstimatedFee: React.FC<Props> = props => {
  const { fromData, toData, isPrepareTx, fee } = props

  return (
    <Flex className="swap-wrapper__estimated-fee" align="center" justify="between">
      {fromData?.amount && parseFloat(fromData?.amount as string) !== 0 && (
        <Text size="2">{`${formatNumber(`${parseFloat(fromData?.amount as string)}`)} ${fromData?.tokenInfo
          ?.symbol} = ${parseFloat(toData?.amount as string) > 0 ? `~${formatNumber(`${toData?.amount}`)}` : 0} ${toData
          ?.tokenInfo?.symbol}`}</Text>
      )}
      {isPrepareTx ? (
        <Skeleton width={150} containerClassName="fee-loading" enableAnimation />
      ) : fee && fee > 0 && parseFloat(fromData?.amount as string) > 0 ? (
        <Text size="2" weight="bold">
          Gas fee {(fee as number) / LAMPORTS_PER_SOL} SOL
        </Text>
      ) : null}
    </Flex>
  )
}
