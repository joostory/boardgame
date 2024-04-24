import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import { useAtom } from "jotai"
import { gameOptionAtom } from "@/atom/modoo-atom"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function StartPlayersForm() {
  const [gameOptions, setGameOptions] = useAtom(gameOptionAtom)

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
      <div className="flex items-center gap-4">
        <span>{gameOptions.players.length} 명</span>
        <Button type='button' size={'xs'} onClick={handleAdd}>
          <PlusIcon className="w-4 h-4" /> 추가
        </Button>
      </div>

      {gameOptions.players.map((it, index) =>
        <div key={index} className="flex items-center justify-center w-full gap-1">
          <Input
            value={it.name} onChange={e => handleChangeName(index, e.target.value)}
          />
          <Button type='button' size={'sm'} variant={'danger'} onClick={() => handleRemove(index)}>
            <MinusIcon className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
