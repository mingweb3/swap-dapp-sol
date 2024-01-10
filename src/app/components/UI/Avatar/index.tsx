import React from 'react'
import * as ReactAvatar from '@radix-ui/react-avatar'

import './styles.scss'

type Props = {
  src?: string
  alt?: string
  className?: string
}

export const Avatar: React.FC<Props> = props => {
  const { className, src, alt } = props
  return (
    <ReactAvatar.Root className={`avatar-root ${className}`}>
      <ReactAvatar.Image className="avatar-image" src={src} alt={alt} />
      <ReactAvatar.Fallback className="avatar-fallback" />
    </ReactAvatar.Root>
  )
}
