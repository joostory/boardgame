import { ModooGame } from '@/domain/modoo'

export function getGame(id: string) {
  if (typeof localStorage === 'undefined') {
    return null
  }

  const value = localStorage.getItem(`modooGame-${id}`)
  if (!value) {
    return null
  }
  return JSON.parse(value)
}

export function setGame(id: string, value: ModooGame) {
  if (typeof localStorage === 'undefined') {
    return
  }
  localStorage.setItem(`modooGame-${id}`, JSON.stringify(value))
}

export function removeGame(id: string) {
  if (typeof localStorage === 'undefined') {
    return
  }
  localStorage.removeItem(`modooGame-${id}`)
}
