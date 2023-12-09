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

interface MooduGameData {
  players: MooduPlayer[]
}

interface MooduPlayer {
  name: string,
  money: number
}
