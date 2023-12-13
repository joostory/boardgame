import { gameOptionsState, gamePlayersState, gameStepState } from "@/state/modoo-state"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { v4 as uuid } from 'uuid'
import { PowerIcon } from '@heroicons/react/24/solid'
import GameHistories from "@/components/modoo/game/GameHistories"
import GamePlayers from "@/components/modoo/game/GamePlayers"

export default function Game() {
  const [step, setStep] = useRecoilState(gameStepState)
  const gameOptions = useRecoilValue(gameOptionsState)
  const setPlayers = useSetRecoilState(gamePlayersState)
  useEffect(() => {
    const money = gameOptions.money
    const players = gameOptions.players

    setPlayers(players.map(it => ({
      id: uuid(),
      name: it.name,
      money: money
    })))
  }, [])

  return (
    <>
      <div className='hero'>
        <div className='hero-content'>
          <div className='text-center'>
            <img src='/modoo.png' className='w-full' />
            <h1 className='text-2xl font-bold'>모두의 마블 점수 계산기</h1>
            <div className='mt-10'>
              <button className='btn btn-warning btn-wide' onClick={() => setStep('step1')}>
                <PowerIcon className="h-6 w-6" /> 게임 종료
              </button>
            </div>
          </div>
        </div>
      </div>

      <GamePlayers />

      <GameHistories />
    </>
  )
}
