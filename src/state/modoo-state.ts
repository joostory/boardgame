import { AtomEffect, atom, selector } from 'recoil'

export const gameOptionState = atom<MooduGameOption>({
  key: 'gameOptions',
  default: {
    money: 2000000,
    players: [
      {name: '참가자 1'},
      {name: '참가자 2'},
    ]
  }
})

export function getGames(): MooduGameMeta[] {
  if (typeof localStorage === 'undefined') {
    return []
  }
  return JSON.parse(localStorage.getItem('mooduGames') || "[]")
}

export function setGames(value: MooduGameMeta[]) {
  if (typeof localStorage === 'undefined') {
    return
  }

  localStorage.setItem('mooduGames', JSON.stringify(value))
}

export function getGame(id: string) {
  if (typeof localStorage === 'undefined') {
    return null
  }

  const value = localStorage.getItem(`mooduGame-${id}`)
  if (!value) {
    return null
  }
  return JSON.parse(value)
}

export function setGame(id: string, value: MooduGame) {
  if (typeof localStorage === 'undefined') {
    return
  }
  localStorage.setItem(`mooduGame-${id}`, JSON.stringify(value))
}

const currentGameEffect: AtomEffect<MooduGame> = ({setSelf, onSet}) => {
  onSet((newValue, oldValue, isReset) => {
    console.log("currentGame", newValue, oldValue, isReset)
    if (!newValue || isReset) {
      return
    }

    if (!oldValue) {
      const games: MooduGameMeta[] = getGames()
      if (games.findIndex(it => it.id == newValue.id) < 0) {
        setGames([
          ...games,
          {
            id: newValue.id,
            started: newValue.started
          }
        ])
      }
    }

    localStorage.setItem(`mooduGame-${newValue.id}`, JSON.stringify(newValue))
  })
}

export const currentGameState = atom<MooduGame>({
  key: 'currentGame',
  default: undefined,
  effects: [
    currentGameEffect
  ]
})

export const gamesState = selector<MooduGameMeta[]>({
  key: 'games',
  get: ({get}) => {
    return getGames()
  }
})

export interface MooduGameMeta {
  id: string
  started: Date
}

export interface MooduGame {
  id: string
  started: Date
  option: MooduGameOption
  players: MooduPlayer[]
  histories: MooduHistory[]
}

export interface MooduGameOption {
  money: number
  players: OptionPlayer[]
}

export interface OptionPlayer {
  name: string
}

export interface MooduGameData {
  players: MooduPlayer[]
}

export interface MooduPlayer {
  id: string
  name: string
  money: number
}

export interface MooduHistory {
  fromId: string
  fromName: string
  toId: string
  toName: string
  amount: number
  time: Date
}
