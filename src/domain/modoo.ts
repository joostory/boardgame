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
  status?: ModooGameStatus
  topPlayerId?: string
  message?: string
}

export enum ModooGameStatus {
  STARTED, ENDED
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
