import { atom } from 'recoil'

export const gameStepState = atom({
  key: 'gameStep',
  default: 'step1'
})

export const gameOptionsState = atom({
  key: 'gameOptions',
  default: {
    money: 2000000,
    players: [
      {name: '참가자 1'},
      {name: '참가자 2'},
    ]
  }
})

export const gameDataState = atom<MooduGameData>({
  key: 'gameData',
  default: {
    players: []
  }
})

export const gamePlayersState = atom<MooduPlayer[]>({
  key: 'gamePlayers',
  default: []
})

export const gameHistoriesState = atom<MooduHistory[]>({
  key: 'gameHistories',
  default: []
})

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
