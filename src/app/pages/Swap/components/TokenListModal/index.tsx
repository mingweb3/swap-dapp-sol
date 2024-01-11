import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { TokenInfo } from '@solana/spl-token-registry'

// Components
import { Modal } from '@/components/UI/Modal'
import { TokenListItem } from '@/components/TokenListItem'
import { ScrollArea } from '@/components/UI/ScrollArea'
import { Avatar } from '@/components/UI/Avatar'

import { useTokenList } from '@/contexts/AppProvider/hooks'

import './styles.scss'

type Props = {
  open: boolean
  onClose: () => void
  onSelectToken: (tokenInfo: TokenInfo) => void
}

export const TokenListModal: React.FC<Props> = props => {
  const { open, onClose, onSelectToken } = props
  const { tokenList } = useTokenList()

  const [searchedList, setSearchList] = useState<TokenInfo[]>([])
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect((): void => {
    if (tokenList?.length && !searchedList?.length) setSearchList(tokenList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenList])

  useEffect((): void => {
    if (!open) {
      setSearchList(tokenList)
      if (searchRef.current?.value) {
        searchRef.current.value = ''
      }
    }
  }, [open, tokenList])

  const onSearchToken = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const key = e.target.value
      const newList = tokenList.filter(
        (token: TokenInfo) => token.symbol.includes(key.toUpperCase()) || token.address.includes(key)
      )
      setSearchList(newList)
    },
    [tokenList]
  )

  return (
    <Modal className="token-list-modal" open={open} onClose={onClose}>
      <div className="token-list__inner">
        <div className="token-list__search">
          <div className="token-list__search-icon">
            <img src="/images/icons/magnifying-glass.svg" alt="magnifying-glass.svg" />
          </div>
          <input type="text" ref={searchRef} placeholder="Search by token or address" onChange={onSearchToken} />
        </div>
        <div className="token-list__featured-tokens">
          {tokenList.slice(0, 8)?.map((token: TokenInfo) => (
            <div key={token.address} className="featured-tokens__item" onClick={() => onSelectToken(token)}>
              <Avatar src={token.logoURI} alt={token.symbol} className="featured-tokens__token-logo" />
              <span className="featured-tokens__token-name">{token.symbol}</span>
            </div>
          ))}
        </div>
        <ScrollArea>
          <div className="token-list__tokens">
            {searchedList.map((token: TokenInfo) => (
              <TokenListItem key={token.address} tokenInfo={token} onClick={() => onSelectToken(token)} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </Modal>
  )
}
