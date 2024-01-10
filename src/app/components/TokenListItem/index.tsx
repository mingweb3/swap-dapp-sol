import React from 'react'
import { Avatar } from '../UI/Avatar'

import './styles.scss'

type Props = {
  showPriceInfo?: boolean
}

export const TokenListItem: React.FC<Props> = props => {
  const { showPriceInfo } = props
  return (
    <div className="token-list-item">
      <div className="token-item__inner">
        <div className="token-item__info-wrapper flex">
          <div className="token-item__info flex gap-6">
            <Avatar className="token-item__logo" />
            <div className="token-item__summary-info flex col gap-4">
              <div className="flex gap-4">
                <div className="token-item__token-symbol">SOL</div>
                <div className="token-item__token-addr">
                  <span>So1...1112</span>
                  <img src="/images/icons/arrow-top-right.svg" alt="arrow-top-right.svg" />
                </div>
              </div>
              <div className="token-item__full-name">Wrapped SOL</div>
            </div>
          </div>
          {showPriceInfo && (
            <div className="token-item__price-info">
              <div className="token-item__current-price">101.14</div>
              <div className="token-item__percent-change token-item__percent-change--up">+12.39%</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
