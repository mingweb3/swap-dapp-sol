import { Box, Flex } from '@radix-ui/themes'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ConnectWalletButton } from '../ConnectWalletButton'
import { PATHS } from '@/constants/paths'
import { isPathnameMatch } from '@/utils/helper'

import './styles.scss'

export const Header: React.FC = () => {
  // Get Current Page for Menu
  const location = useLocation()
  const { pathname } = location

  return (
    <Flex className="header" align="center" justify="between" p="4" gap="3">
      <Flex className="header__left-content" gap="8" align="center">
        <Link to={PATHS.HOME}>
          <div className="header__logo-wrapper">
            <img src="/images/logo/logo.png" alt="logo.png" />
          </div>
        </Link>
        <ul className="header__nav-links">
          <li className={`mn-item ${isPathnameMatch(pathname, PATHS.SWAP) ? 'active' : 'no'}`}>
            <Link to={PATHS.SWAP}>Swap</Link>
          </li>
          <li className={`mn-item ${isPathnameMatch(pathname, PATHS.AIRDROP) ? 'active' : 'no'}`}>
            <Link to={PATHS.AIRDROP}>Airdrop</Link>
          </li>
          {/* <li>
            <Link to="/not-support-yet">LP Pool</Link>
          </li>
          <li>
            <Link to="/not-support-yet">Trading</Link>
          </li> */}
        </ul>
      </Flex>

      <Box>
        <ConnectWalletButton />
      </Box>
    </Flex>
  )
}
