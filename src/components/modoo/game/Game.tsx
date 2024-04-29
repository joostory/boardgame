import GameHistories from "@/components/modoo/game/GameHistories"
import GamePlayers from "@/components/modoo/game/GamePlayers"
import GameHeader from '@/components/modoo/game/GameHeader'

export default function Game() {
  return (
    <div className='max-w-[640px] mx-auto pb-20'>
      <GameHeader />

      <GamePlayers />

      <GameHistories />
    </div>
  )
}
