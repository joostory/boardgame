import { RecoilRoot, useRecoilValue } from 'recoil'
import { currentGameState } from '@/state/modoo-state'
import Start from '@/components/modoo/start/Start'
import Game from '@/components/modoo/game/Game'

function App() {
  const currentGame = useRecoilValue(currentGameState)

  if (currentGame) {
    return <Game />
  } else {
    return <Start />
  }
}

export default function MooduApp() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  )
}
