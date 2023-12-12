import { ReceiveButton, SendButton } from "@/components/modoo/game/GameActionButton"
import { MooduPlayer, gameHistoriesState, gameOptionsState, gamePlayersState, gameStepState } from "@/state/modoo-state"
import { toNumberFormat } from "@/utils/numberformat"
import { useEffect } from "react"
import { DateTime } from 'luxon'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { v4 as uuid } from 'uuid'
import { PowerIcon } from '@heroicons/react/24/solid'
import { toTimeFormat } from "@/utils/dateFormat"
import { CheckCircleIcon } from "@heroicons/react/24/solid"


function PlayerItem({player}: {player: MooduPlayer}) {
  return (
    <>
      <div className="flex min-w-0 gap-x-4 w-full">
        <div className="min-w-0 flex-auto grow">
          <p className="text-xl font-semibold leading-6">
            {player.name}
          </p>
          <p className="mt-5 truncate text-3xl leading-8">
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
    <div className="flex justify-center items-center my-5">
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

function GameHistories() {
  const histories = useRecoilValue(gameHistoriesState)

  return (
    <ul className="timeline timeline-vertical timeline-compact px-10">
      {histories.map((it, index) =>
        <li key={index} style={{fontSize: 12}}>
          <hr style={{height: 10}} />
          <div className="timeline-start">
            {toTimeFormat(it.time)}
          </div>
          <div className="timeline-middle">
            <CheckCircleIcon className="h-5 w-5" />
          </div>
          <div className="timeline-end ">
            {it.fromName} -&gt; {it.toName} : <b className="text-success">{toNumberFormat(it.amount)}</b>
          </div>
          <hr />
        </li>
      )}
    </ul>
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
