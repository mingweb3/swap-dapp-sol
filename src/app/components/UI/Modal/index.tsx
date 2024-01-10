import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import './styles.scss'

type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  overlayClassName?: string
}

export const Modal: React.FC<Props> = props => {
  const { open, onClose, children, className, overlayClassName } = props
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal container={document.getElementById('radix-root')}>
        <Dialog.Overlay className={`modal-overlay ${overlayClassName}`} onClick={onClose} />
        <Dialog.Content className={`modal-content ${className}`}>
          <Dialog.Close asChild>
            <button className="modal-content__close-btn" aria-label="Close" onClick={onClose}>
              <span>Close</span>
            </button>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
