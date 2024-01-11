import { Box, Flex } from '@radix-ui/themes'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ConnectWalletButton } from '../ConnectWalletButton'
import { PATHS } from '@/constants/paths'

import './styles.scss'

export const Header: React.FC = () => {
  const location = useLocation()
  return (
    <Flex className="header" align="center" justify="between" p="4" gap="3">
      <Flex className="header__left-content" gap="8" align="center">
        <Link to={PATHS.HOME}>
          <div className="header__logo-wrapper">
            <img src="/images/logo/logo.png" alt="logo.png" />
          </div>
        </Link>
        <ul className="header__nav-links">
          <li>
            <Link className={location.pathname === PATHS.SWAP ? 'active' : ''} to={PATHS.SWAP}>
              Swap
            </Link>
          </li>
          <li>
            <Link to="/">Token</Link>
          </li>
          <li>
            <Link to="/">Pool</Link>
          </li>
          <li>
            <Link to="/">Trading</Link>
          </li>
        </ul>
      </Flex>

      <Box>
        <ConnectWalletButton />
      </Box>
    </Flex>
  )
}
