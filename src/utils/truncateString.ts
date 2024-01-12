export const truncateString = (inputString: string, maxLength: number): string => {
  if (inputString.length <= maxLength) {
    return inputString
  }

  const leftLength = Math.ceil((maxLength - 3) / 2)
  const rightLength = Math.floor((maxLength - 3) / 2)

  const truncatedString =
    inputString.substring(0, leftLength) + '...' + inputString.substring(inputString.length - rightLength)

  return truncatedString
}
