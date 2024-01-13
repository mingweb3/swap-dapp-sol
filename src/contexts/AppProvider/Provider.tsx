/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastBase } from '@/components/UI/Toast'
import { DEFAULT_FROM_DATA, DEFAULT_TO_DATA, SECONDS_TO_REFRESH } from '@/constants'
import { PATHS } from '@/constants/paths'
import { useFetchTokenList } from '@/hooks/useFetchTokenList'
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice'
import { SplToken, TokenData, TokenPrice } from '@/types'
import { getSPLTokenData } from '@/utils/helper.solWeb3'
import { truncateString } from '@/utils/truncateString'
import { TokenInfo } from '@solana/spl-token-registry'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type AppProviderProps = { children: React.ReactNode }

type AppContextProps = {
  tokenList: TokenInfo[]
  fromData: TokenData | null
  setFromData: React.Dispatch<React.SetStateAction<TokenData | null>>
  toData: TokenData | null
  setToData: React.Dispatch<React.SetStateAction<TokenData | null>>
  tokenPrice: TokenPrice | null
  splTokenData: SplToken[]
  fetchTokenPrice: () => void
  fetchSPLTokenData: () => Promise<void>
}

const AppContext = React.createContext<AppContextProps | undefined>(undefined)

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const wallet = useWallet()
  const { connection } = useConnection()
  const { tokenList } = useFetchTokenList()
  const { fetchTokenPrice } = useFetchTokenPrice()

  const [fromData, setFromData] = useState<TokenData | null>(null)
  const [toData, setToData] = useState<TokenData | null>(null)
  const [tokenPrice, setTokenPrice] = useState<TokenPrice | null>(null)
  const [refreshTimer, setRefreshTimer] = useState<number | null>(null)
  const [splTokenData, setSplTokenData] = useState<SplToken[]>([])
  const refreshTimerRef = useRef<any>(null)

  useEffect((): void => {
    if (wallet.connected) {
      toast(
        <ToastBase title="Wallet Connected">
          <span>Connected to wallet {truncateString(wallet.publicKey?.toString() as string, 9)}</span>
        </ToastBase>,
        {
          type: 'success'
        }
      )
      fetchSPLTokenData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected])

  useEffect((): void => {
    const currentPath = `${PATHS.SWAP}/${fromData?.tokenInfo?.symbol}-${toData?.tokenInfo?.symbol}`
    if (fromData && toData && location.pathname !== currentPath) {
      navigate(currentPath)
    }
    _fetchTokenPrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromData, toData])

  useEffect((): void => {
    if (tokenList?.length) {
      const segments = location.pathname.split('/')
      const tokenPair = segments?.[2]?.split('-')

      setFromData({
        tokenInfo: tokenPair?.[0]
          ? tokenList?.find(t => t.symbol === tokenPair[0]) || DEFAULT_FROM_DATA.tokenInfo
          : DEFAULT_FROM_DATA.tokenInfo,
        amount: 0
      })
      setToData({
        tokenInfo: tokenPair?.[1]
          ? tokenList?.find(t => t.symbol === tokenPair[1]) || DEFAULT_TO_DATA.tokenInfo
          : DEFAULT_TO_DATA.tokenInfo,
        amount: 0
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenList])

  const fetchSPLTokenData = useCallback(
    (): Promise<void> =>
      getSPLTokenData(wallet, connection).then((tokenList: SplToken[]) => {
        if (tokenList) {
          setSplTokenData(() => tokenList.filter(t => t !== undefined))
        }
      }),
    [wallet, connection]
  )

  const _fetchTokenPrice = useCallback((): void => {
    if (fromData && toData) {
      fetchTokenPrice([
        fromData.tokenInfo.extensions?.coingeckoId as string,
        toData.tokenInfo.extensions?.coingeckoId as string
      ])
        .then(res => {
          setTokenPrice(res)
        })
        .finally(() => {
          setRefreshTimer(SECONDS_TO_REFRESH)
        })
    }
  }, [fromData, toData, fetchTokenPrice])

  /**
   * A timer management component that counts down from a specified time.
   *
   * @param {number} timer - The current timer value.
   * @param {React.MutableRefObject<any>} refreshTimerRef - A mutable ref to manage the timer interval.
   */
  useEffect((): (() => void) => {
    if (refreshTimer === 0) {
      _fetchTokenPrice()
      clearInterval(refreshTimerRef.current)
    } else {
      refreshTimerRef.current = setInterval(() => {
        setRefreshTimer((refreshTimer as number) - 1)
      }, 1000)
    }

    return () => {
      clearInterval(refreshTimerRef.current)
    }
  }, [refreshTimer, _fetchTokenPrice])

  return (
    <AppContext.Provider
      value={{
        tokenList,
        fromData,
        setFromData,
        toData,
        setToData,
        tokenPrice,
        splTokenData,
        fetchSPLTokenData,
        fetchTokenPrice: _fetchTokenPrice
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
