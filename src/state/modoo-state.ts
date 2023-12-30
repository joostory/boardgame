import { AtomEffect, atom } from 'recoil'

export const gameOptionState = atom<ModooGameOption>({
  key: 'gameOptions',
  default: {
    money: 2000000,
    players: [
      {name: '참가자 1'},
      {name: '참가자 2'},
    ]
  }
})

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

export interface ModooGameMeta {
  id: string
  started: Date
}

export interface ModooGame {
  id: string
  started: Date
  option: ModooGameOption
  players: ModooPlayer[]
  histories: ModooHistory[]
}

export interface ModooGameOption {
  money: number
  players: OptionPlayer[]
}

export interface OptionPlayer {
  name: string
}

export interface ModooGameData {
  players: ModooPlayer[]
}

export interface ModooPlayer {
  id: string
  name: string
  money: number
}

export interface ModooHistory {
  fromId: string
  fromName: string
  toId: string
  toName: string
  amount: number
  time: Date
}
