export function unformatNumber(formattedInput: string): string {
  const unformattedString = formattedInput.replace(/,/g, '')
  return unformattedString
}
