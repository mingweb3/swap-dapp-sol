import { Flex } from '@radix-ui/themes'
import React from 'react'

import './styles.scss'

export const Footer: React.FC = () => {
  return (
    <Flex align="center" justify="center" className="footer" gap="1" p="4">
      <div className="footer__copyrite-text">
        mSwap © copyright 2024. Developed by mingweb3@gmail.com / <strong>Wizard</strong>_ev
      </div>
    </Flex>
  )
}