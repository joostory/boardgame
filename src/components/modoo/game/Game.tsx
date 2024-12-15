import GameHistories from "@/components/modoo/game/GameHistories"
import GamePlayers from "@/components/modoo/game/GamePlayers"
import GameHeader from '@/components/modoo/game/GameHeader'
import LandButton from "@/components/modoo/shared/LandButton"
import CommandButton from "@/components/modoo/shared/CommandButton"
import CubeButton from "@/components/modoo/shared/CubeButton"
import CubeSpace from "@/components/modoo/shared/CubeSpace"
import LandList from "@/components/modoo/shared/LandList"

export default function Game() {
  return (
    <div className='max-w-[640px] md:max-w-full mx-auto pb-20'>
      <GameHeader />

      <div className="flex justify-center gap-2 my-5">
        <LandButton />
        <CommandButton />
        <CubeButton />
      </div>

      <div className="grid md:grid-cols-2">
        <div>
          <GamePlayers />
          <GameHistories />
        </div>
        <div className="hidden sm:block my-5 mx-5">
          <div className="border rounded-xl p-4">
            <LandList />
          </div>

          <div className="border rounded-xl p-4 mt-4">
            <CubeSpace />
          </div>
        </div>
      </div>
    </div>
  )
}
