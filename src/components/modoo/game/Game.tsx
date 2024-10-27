import GameHistories from "@/components/modoo/game/GameHistories"
import GamePlayers from "@/components/modoo/game/GamePlayers"
import GameHeader from '@/components/modoo/game/GameHeader'
import LandButton from "@/components/modoo/shared/LandButton"
import CommandButton from "@/components/modoo/shared/CommandButton"

export default function Game() {
  return (
    <div className='max-w-[640px] mx-auto pb-20'>
      <GameHeader />

      <div className="flex justify-center gap-2 my-5">
        <LandButton />
        <CommandButton />
      </div>

      <GamePlayers />

      <GameHistories />
    </div>
  )
}
