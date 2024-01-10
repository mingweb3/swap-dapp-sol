import React from 'react'

// Components
import { Modal } from '@/components/UI/Modal'
import { TokenListItem } from '@/components/TokenListItem'
import { ScrollArea } from '@/components/UI/ScrollArea'
import { Avatar } from '@/components/UI/Avatar'

import './styles.scss'

type Props = {
  open: boolean
  onClose: () => void
}

export const TokenListModal: React.FC<Props> = props => {
  const { open, onClose } = props
  return (
    <Modal className="token-list-modal" open={open} onClose={onClose}>
      <div className="token-list__inner">
        <div className="token-list__search">
          <div className="token-list__search-icon">
            <img src="/images/icons/magnifying-glass.svg" alt="magnifying-glass.svg" />
          </div>
          <input placeholder="Search by token" />
        </div>
        <div className="token-list__featured-tokens">
          <div className="featured-tokens__item">
            <Avatar className="featured-tokens__token-logo" />
            <span className="featured-tokens__token-name">SOL</span>
          </div>
        </div>
        <ScrollArea>
          <div className="token-list__tokens">
            {Array.from({ length: 50 }, (_, i) => (
              <TokenListItem key={i} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </Modal>
  )
}
