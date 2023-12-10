import { RecoilRoot, useRecoilState } from 'recoil'
import { gameStepState } from '@/state/modoo-state'
import Start from '@/components/modoo/start/Start'
import Game from '@/components/modoo/game/Game'

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
