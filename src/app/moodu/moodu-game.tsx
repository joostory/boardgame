import { gameDataState, gameOptionsState } from "@/app/moodu/game-state"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

function GamePlayers() {
  const [gameData, setGameData] = useRecoilState(gameDataState)

  return (
    <ol>
      {gameData.players.map(it =>
        <li key={it.name}>{it.name} - {it.money}</li>
      )}
    </ol>
  )
}

export default function Game() {
  const gameOptions = useRecoilValue(gameOptionsState)
  const setGameData = useSetRecoilState(gameDataState)
  useEffect(() => {
    const money = gameOptions.money
    const players = gameOptions.players

    setGameData({
      players: players.map(it => ({
        name: it.name,
        money: money
      }))
    })
  }, [])

  return (
    <>
      <div className='hero'>
        <div className='hero-content'>
          <div className='text-center'>
            <img src='/moodu.png' className='w-full' />
            <h1 className='text-2xl'>모두의 마블 점수 계산기</h1>
          </div>
        </div>
      </div>

      <GamePlayers />
    </>
  )
}
