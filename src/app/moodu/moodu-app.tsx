import { RecoilRoot, useRecoilState } from 'recoil'
import { gameStepState } from '@/app/moodu/game-state'
import Start from '@/app/moodu/moodu-start'
import Game from '@/app/moodu/moodu-game'

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
