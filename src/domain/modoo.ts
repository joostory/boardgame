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

export interface ModooCommand {
  id: number
  name: string
  description: string
  type: string
  storable: boolean
}

export interface ModooLand {
  id: string
  name: string
  type: string
  color: string
}

export function getLandColorBgClass(color: string) {
  switch(color) {
    case 'green':
      return "bg-green-700"
    case 'red':
      return "bg-red-500"
    case 'orange':
      return "bg-amber-500"
    case 'deep-pink':
      return "bg-pink-600"
    case 'purple':
      return "bg-purple-500"
    case 'light-blue':
      return "bg-blue-400"
    case 'blue':
      return "bg-blue-600"
    case 'light-green':
      return "bg-green-500"
    case 'pink':
      return "bg-pink-400"
    case 'sky':
      return "bg-blue-300"
    default:
      return "bg-slate-600"
  }
}

export interface ModooBuilding {
  id: number
  landid: string
  name: string
  constcost: number
  tollfee: number
  acquisitioncost: number
  sellingcost: number
  acquisitionable: boolean
}

export function updatePlayer(players: ModooPlayer[], id: string, money: number): ModooPlayer {
  const index = players.findIndex(it => it.id == id)
  const updatedPlayer = players[index]

  players.splice(index, 1, {
    ...updatedPlayer,
    money: updatedPlayer.money + money
  })
  return updatedPlayer
}

export function getTopPlayer(players: ModooPlayer[]): ModooPlayer {
  return players.reduce((prev, current) => {
    return prev.money > current.money? prev : current
  })
}
