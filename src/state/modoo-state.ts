import { ModooGame, ModooGameMeta, ModooGameOption } from '@/domain/modoo'
import { AtomEffect, atom } from 'recoil'

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

const localStorageEffect = <T>(key: string): AtomEffect<T> => ({setSelf, onSet}) => {
  if (typeof localStorage === 'undefined') {
    return
  }

  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue))
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  })
}

const currentGameEffect: AtomEffect<ModooGame> = ({setSelf, onSet}) => {
  onSet((newValue, _, isReset) => {
    if (!newValue || isReset) {
      return
    }
    setGame(newValue.id, newValue)
  })
}

export const currentGameState = atom<ModooGame>({
  key: 'currentGame',
  default: undefined,
  effects: [
    currentGameEffect
  ]
})

export const gamesState = atom<ModooGameMeta[]>({
  key: 'games',
  default: [],
  effects: [
    localStorageEffect('modooGames')
  ]
})
