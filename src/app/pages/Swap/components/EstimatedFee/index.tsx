import { Flex, Text } from '@radix-ui/themes'
import React from 'react'

import './styles.scss'

export const EstimatedFee: React.FC = () => {
  return (
    <Flex className="swap-wrapper__estimated-fee" align="center" justify="between">
      <Text size="2">1 SOL = 104.23 USDT</Text>
      <Text size="2" weight="bold">
        Gas fee $1.23
      </Text>
    </Flex>
  )
}
