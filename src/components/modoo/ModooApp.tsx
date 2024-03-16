import { Provider, useAtom, useAtomValue } from 'jotai'
import Start from '@/components/modoo/start/Start'
import Game from '@/components/modoo/game/Game'
import { currentGameAtom, currentGameEffect, gamesEffect } from '@/atom/modoo-atom'

function App() {
  useAtom(currentGameEffect)
  useAtom(gamesEffect)
  const currentGame = useAtomValue(currentGameAtom)

  if (currentGame) {
    return <Game />
  } else {
    return <Start />
  }
}

export default function ModooApp() {
  return (
    <Provider>
      <App />
    </Provider>
  )
}
