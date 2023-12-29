import { currentGameState } from "@/state/modoo-state"
import { useResetRecoilState } from "recoil"
import { PowerIcon } from '@heroicons/react/24/solid'
import GameHistories from "@/components/modoo/game/GameHistories"
import GamePlayers from "@/components/modoo/game/GamePlayers"

export default function Game() {
  const resetCurrentGame = useResetRecoilState(currentGameState)

  return (
    <>
      <div className='hero'>
        <div className='hero-content'>
          <div className='text-center'>
            <img src='/modoo.png' className='w-full' />
            <h1 className='text-2xl font-bold'>모두의 마블 점수 계산기</h1>
            <div className='mt-10'>
              <button className='btn btn-warning btn-wide' onClick={resetCurrentGame}>
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
