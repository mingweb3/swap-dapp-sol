export function formatNumber(input: string): string {
  const numberValue = parseFloat(input)
  if (isNaN(numberValue)) {
    return input
  }

  const parts = input.split('.')
  const integerPart = parts[0]
  const decimalPart = parts.length > 1 ? `.${parts[1]}` : ''

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const formattedNumber = `${formattedInteger}${decimalPart}`

  return formattedNumber
}
