import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { TokenData } from '@/types'

import './styles.scss'
import { useTokenPrice } from '@/contexts/AppProvider/hooks'

type Props = {
  fromData: TokenData | null
  toData: TokenData | null
}

export const EstimatedFee: React.FC<Props> = props => {
  const { fromData, toData } = props

  const { from, to } = useTokenPrice()

  if ((fromData?.amount as number) === 0) return null

  return (
    <Flex className="swap-wrapper__estimated-fee" align="center" justify="between">
      <Text size="2">{`${fromData?.amount} ${fromData?.tokenInfo?.symbol} = 104.23 ${toData?.tokenInfo?.symbol}`}</Text>
      <Text size="2" weight="bold">
        Gas fee $1.23
      </Text>
    </Flex>
  )
}
