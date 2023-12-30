import { currentGameState, gamesState } from "@/state/modoo-state"
import { useEffect } from "react"
import { useRecoilState } from "recoil"

export default function ModooGameEffect() {
  const [currentGame, setCurrentGame] = useRecoilState(currentGameState)
  const [games, setGames] = useRecoilState(gamesState)

  useEffect(() => {
    if (currentGame && games.findIndex(it => it.id == currentGame.id) < 0) {
      setGames([
        ...games,
        {
          id: currentGame.id,
          started: currentGame.started
        }
      ])
    }
  }, [currentGame, games])

  return <></>
}
