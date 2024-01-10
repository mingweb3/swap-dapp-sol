import React from 'react'
import { AppContext } from './Provider'

export const useAppState = () => {
  const context = React.useContext(AppContext)

  if (context) {
    return context
  }

  throw new Error(`useAppState must be used within a AppProvider`)
}
