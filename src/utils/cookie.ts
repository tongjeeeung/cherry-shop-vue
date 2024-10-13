export function setToken(token: string, days: number = 30): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `token=${token}; expires=${expires}; path=/`
}

export function getToken(): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; token=`)
  if (parts.length === 2 && parts !== undefined) {
    return parts.pop().split(';')[0]
  }
  return null
}

export function deleteToken(): void {
  document.cookie = `token=; Max-Age=0; path=/`
}
