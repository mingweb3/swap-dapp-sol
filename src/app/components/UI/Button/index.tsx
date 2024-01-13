import React from 'react'
import { Button as RadixButton } from '@radix-ui/themes'

import './styles.scss'
import { Spin } from '../Loader'

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof RadixButton> {}
type Props = {
  title?: string
  loading?: boolean
}

export const Button: React.FC<ButtonProps & React.RefAttributes<HTMLButtonElement> & Props> = props => {
  const { title, className, loading, disabled, ...rest } = props
  return (
    <RadixButton
      disabled={loading || disabled}
      className={`custom-button ${disabled ? 'custom-button--disabled' : ''} ${className}`}
      variant="outline"
      radius="medium"
      {...rest}
    >
      <div className="custome-button__inner">
        {loading && <Spin />}
        <span>{title}</span>
      </div>
    </RadixButton>
  )
}
