export const truncateString = (inputString: string, maxLength: number): string => {
  if (!inputString) return ''

  if (inputString.length <= maxLength) {
    return inputString
  }

  const truncatedString = inputString.substring(0, maxLength - 3) + '...'
  return truncatedString
}
