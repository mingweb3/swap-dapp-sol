import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { TokenData } from '@/types'

import './styles.scss'
import { formatNumber } from '@/utils/formatNumber'

type Props = {
  fromData: TokenData | null
  toData: TokenData | null
}

export const EstimatedFee: React.FC<Props> = props => {
  const { fromData, toData } = props

  return (
    <Flex className="swap-wrapper__estimated-fee" align="center" justify="between">
      {(fromData?.amount as number) !== 0 && (
        <Text size="2">{`${formatNumber(`${fromData?.amount}`)} ${fromData?.tokenInfo?.symbol} = -- ${toData?.tokenInfo
          ?.symbol}`}</Text>
      )}
      <Text size="2" weight="bold">
        Gas fee 0.00002 SOL
      </Text>
    </Flex>
  )
}
