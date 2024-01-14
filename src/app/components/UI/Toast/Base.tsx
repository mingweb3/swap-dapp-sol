import React from 'react'
import './styles.scss'

type Props = {
  title?: string
  children?: React.ReactNode
}

export const ToastBase: React.FC<Props> = props => {
  const { title, children } = props

  return (
    <div className="toast-base">
      <div className="toast-base__title">{title}</div>
      {children}
    </div>
  )
}
