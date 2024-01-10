import * as ReactScrollArea from '@radix-ui/react-scroll-area'
import React from 'react'
import './styles.scss'

type Props = {
  children: React.ReactNode
}

export const ScrollArea: React.FC<Props> = props => {
  const { children } = props
  return (
    <ReactScrollArea.Root className="ScrollAreaRoot">
      <ReactScrollArea.Viewport className="ScrollAreaViewport">{children}</ReactScrollArea.Viewport>
      <ReactScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
        <ReactScrollArea.Thumb className="ScrollAreaThumb" />
      </ReactScrollArea.Scrollbar>
      <ReactScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
        <ReactScrollArea.Thumb className="ScrollAreaThumb" />
      </ReactScrollArea.Scrollbar>
      <ReactScrollArea.Corner className="ScrollAreaCorner" />
    </ReactScrollArea.Root>
  )
}
