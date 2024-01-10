import React from 'react'

type AppProviderProps = { children: React.ReactNode }

type AppContextProps = undefined

export type ValidateProductError = {
  message: string
  name: string
  product_id: number
}

const AppContext = React.createContext<AppContextProps | undefined>(undefined)

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <AppContext.Provider value={undefined}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }
