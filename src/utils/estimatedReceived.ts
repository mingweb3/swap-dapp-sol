import { AAT_TOKEN_MINT, BBT_TOKEN_MINT } from '@/constants/programs'
import { TokenData } from '@/types'

export const estimatedReceived = (fromData: TokenData, toData: TokenData) => {
  const { tokenInfo, amount } = fromData || {}

  if (
    parseFloat(amount as string) <= 0 ||
    (fromData?.tokenInfo?.address !== AAT_TOKEN_MINT.toString() &&
      fromData?.tokenInfo?.address !== BBT_TOKEN_MINT.toString()) ||
    (toData?.tokenInfo?.address !== AAT_TOKEN_MINT.toString() &&
      toData?.tokenInfo?.address !== BBT_TOKEN_MINT.toString())
  )
    return '0'

  if (tokenInfo.address === AAT_TOKEN_MINT.toString()) {
    return parseFloat(`${parseFloat(amount as string) * 0.68857405}`).toFixed(3)
  }

  if (tokenInfo.address === BBT_TOKEN_MINT.toString()) {
    return parseFloat(`${parseFloat(amount as string) * 1.45053491}`).toFixed(3)
  }

  return '0'
}
