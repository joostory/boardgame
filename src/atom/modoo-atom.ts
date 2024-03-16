import { ModooGame, ModooGameMeta, ModooGameOption } from '@/domain/modoo'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const gameOptionAtom = atomWithStorage<ModooGameOption>(
  'modooGameOption',
  {
    money: 2000000,
    players: [
      {name: '참가자 1'},
      {name: '참가자 2'},
    ]
  }
)

export const currentGameAtom = atom<ModooGame | undefined>(undefined)

export const gamesAtom = atom<ModooGameMeta[]>([])
