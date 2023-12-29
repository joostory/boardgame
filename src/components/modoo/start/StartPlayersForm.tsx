import { gameOptionState } from "@/state/modoo-state"
import { useRecoilState } from "recoil"
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'

export default function StartPlayersForm() {
  const [gameOptions, setGameOptions] = useRecoilState(gameOptionState)

  function handleAdd() {
    setGameOptions({
      ...gameOptions,
      players: [
        ...gameOptions.players,
        {name: `참여자 ${gameOptions.players.length + 1}`}
      ]
    })
  }

  function handleChangeName(index: number, value: string) {
    const newPlayers = [...gameOptions.players]
    newPlayers.splice(index, 1, {name: value})
    setGameOptions({
      ...gameOptions,
      players: newPlayers
    })
  }

  function handleRemove(index: number) {
    const newPlayers = [...gameOptions.players]
    newPlayers.splice(index, 1)
    setGameOptions({
      ...gameOptions,
      players: newPlayers
    })
  }

  return (
    <div className='text-start grid gap-4'>
      <div className="flex items-center">
        <span>{gameOptions.players.length} 명</span>
        <button type='button' className='btn btn-xs ml-4 btn-primary' onClick={handleAdd}>
          <PlusIcon className="w-4 h-4" /> 추가
        </button>
      </div>

      {gameOptions.players.map((it, index) =>
        <div key={index} className="join">
          <input
            className='input input-bordered input-sm join-item w-full'
            value={it.name} onChange={e => handleChangeName(index, e.target.value)}
          />
          <button type='button' className='btn btn-sm btn-error join-item' onClick={() => handleRemove(index)}>
            <MinusIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
