import React from 'react'
import './styles.scss'

type Props = {
  width?: string
  height?: string
}

export const Spin: React.FC<Props> = props => {
  const { height, width } = props
  return <span style={{ width, height }} className="loader-spin" />
}
