import { RecoilRoot, useRecoilState } from 'recoil'
import { gameStepState } from '@/app/state/game-state'
import Start from '@/app/components/start/Start'
import Game from '@/app/components/game/Game'

function App() {
  const [step, setStep] = useRecoilState(gameStepState)

  switch (step) {
    case 'step2':
      return <Game />
    case 'step1':
    default:
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
