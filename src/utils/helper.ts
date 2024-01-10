export const isPathnameMatch = (pathname: string, str: string): boolean => {
  const sanitizedPathname = pathname.replace(/\/$/, '')
  const sanitizedStr = str.replace(/\/$/, '')

  return sanitizedPathname.startsWith(sanitizedStr)
}
