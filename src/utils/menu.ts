export const menuIsActive = (pathname: string, key: string): boolean => {
  if (!pathname || !key) {
    return false
  }
  const regex = RegExp(`^/?${key}/?`)
  return !!pathname.match(regex)
}
