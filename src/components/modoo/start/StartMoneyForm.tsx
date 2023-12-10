import { gameOptionsState } from "@/state/modoo-state"
import { useRecoilState } from "recoil"

export default function StartMoneyForm() {
  const [gameOptions, setGameOptions] = useRecoilState(gameOptionsState)
  return (
    <div className='join'>
      <input
        className='input input-bordered join-item w-full'
        type='number'
        value={gameOptions.money}
        onChange={e => {
          setGameOptions({
            ...gameOptions,
            money: parseInt(e.target.value),
          })
        }}
      />
      <div className='join-item flex justify-center items-center w-14 bg-base-300'>
        원
      </div>
    </div>
  )
}
