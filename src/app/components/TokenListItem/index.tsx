import React from 'react'
import { Avatar } from '../UI/Avatar'

import './styles.scss'
import { TokenInfo } from '@solana/spl-token-registry'
import { truncateString } from '@/utils/truncateString'
import { EnvConfig } from '@/constants/envConfig'

type Props = {
  tokenInfo: TokenInfo
  tokenPrice?: number
  percentChange?: number
  onClick?: () => void
}

export const TokenListItem: React.FC<Props> = props => {
  const { tokenInfo, tokenPrice, percentChange, onClick } = props
  const { logoURI, symbol, name, address } = tokenInfo || {}
  return (
    <div className="token-list-item" onClick={onClick}>
      <div className="token-item__inner">
        <div className="token-item__info-wrapper flex">
          <div className="token-item__info flex gap-6">
            <Avatar src={logoURI} alt={name} className="token-item__logo" />
            <div className="token-item__summary-info flex col gap-4">
              <div className="flex gap-4">
                <div className="token-item__token-symbol">{symbol}</div>
                <a href={`${EnvConfig.SOLSCAN_EXPLORE_URL}token/${address}?cluster=devnet`} target="_blank">
                  <div className="token-item__token-addr">
                    <span>{truncateString(address, 11)}</span>
                    <img src="/images/icons/arrow-top-right.svg" alt="arrow-top-right.svg" />
                  </div>
                </a>
              </div>
              <div className="token-item__full-name">{name}</div>
            </div>
          </div>
          {(tokenPrice || percentChange) && (
            <div className="token-item__price-info">
              {tokenPrice && <div className="token-item__current-price">{tokenPrice}</div>}
              {percentChange && (
                <div
                  className={`token-item__percent-change token-item__percent-change--${
                    percentChange > 0 ? 'up' : 'down'
                  }`}
                >
                  {`${percentChange > 0 ? '+' : ''}${percentChange?.toFixed(2)}%`}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
