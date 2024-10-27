import { ModooCommand, ModooGame, ModooGameMeta, ModooGameOption } from '@/domain/modoo'
import { setGame } from '@/storage/modoo-storage'
import { atom } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { atomWithStorage, atomWithReset } from 'jotai/utils'

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

export const gamesEffect = atomEffect((get, set) => {
  const currentGame = get(currentGameAtom)
  const games = get(gamesAtom)
  if (currentGame && games.findIndex(it => it.id == currentGame.id) < 0) {
    set(gamesAtom, [
      ...games,
      {
        id: currentGame.id,
        started: currentGame.started
      }
    ])
  }
})

export const currentGameEffect = atomEffect((get) => {
  const newValue = get(currentGameAtom)
  if (!newValue) {
    return
  }
  setGame(newValue.id, newValue)
})

export const currentGameAtom = atomWithReset<ModooGame | undefined>(undefined)

export const gamesAtom = atomWithStorage<ModooGameMeta[]>('modooGames', [])

export const commandsAtom = atom<ModooCommand[]>([])
