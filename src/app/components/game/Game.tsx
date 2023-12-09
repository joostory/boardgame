import { ReceiveButton, SendButton } from "@/app/components/game/GameActionButton"
import { MooduPlayer, gameOptionsState, gamePlayersState, gameStepState } from "@/app/state/game-state"
import { toNumberFormat } from "@/app/utils/numberformat"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"


function PlayerItem({player}: {player: MooduPlayer}) {
  return (
    <>
      <div className="flex min-w-0 gap-x-4 w-full">
        <div className="min-w-0 flex-auto grow">
          <p className="text-xl font-semibold leading-6">
            {player.name}
          </p>
          <p className="mt-5 truncate text-3xl leading-5">
            {toNumberFormat(player.money)}
          </p>
        </div>
        <div className="shrink-0 flex flex-row items-center gap-x-2">
          <SendButton player={player} />
          <ReceiveButton player={player} />
        </div>
      </div>
    </>
  )
}


function GamePlayers() {
  const players = useRecoilValue(gamePlayersState)

  return (
    <div className="flex justify-center items-center my-20">
      <ul className="divide-y divide-gray-800 w-full max-w-[640px] px-4 py-2 rounded-xl border border-gray-800">
        {players.map(it =>
          <li key={it.id} className="flex justify-between gap-x-6 py-6">
            <PlayerItem player={it} />
          </li>
        )}
      </ul>
    </div>
  )
}

export default function Game() {
  const [step, setStep] = useRecoilState(gameStepState)
  const gameOptions = useRecoilValue(gameOptionsState)
  const setPlayers = useSetRecoilState(gamePlayersState)
  useEffect(() => {
    const money = gameOptions.money
    const players = gameOptions.players

    setPlayers(players.map(it => ({
      id: crypto.randomUUID(),
      name: it.name,
      money: money
    })))
  }, [])

  return (
    <>
      <div className='hero'>
        <div className='hero-content'>
          <div className='text-center'>
            <img src='/moodu.png' className='w-full' />
            <h1 className='text-2xl font-bold'>모두의 마블 점수 계산기</h1>
            <div className='mt-10'>
              <button className='btn btn-warning btn-wide' onClick={() => setStep('step1')}>
                게임 종료
              </button>
            </div>
          </div>
        </div>
      </div>

      <GamePlayers />
    </>
  )
}
