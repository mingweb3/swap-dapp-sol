import React from 'react'
import { Button as RadixButton } from '@radix-ui/themes'

import './styles.scss'

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof RadixButton> {}
type Props = {
  title?: string
}

export const Button: React.FC<ButtonProps & React.RefAttributes<HTMLButtonElement> & Props> = props => {
  const { title, className, ...rest } = props
  return (
    <RadixButton className={`custom-button ${className}`} variant="outline" radius="medium" {...rest}>
      <span>{title}</span>
    </RadixButton>
  )
}
