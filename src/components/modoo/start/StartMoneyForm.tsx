import MoneyInput from "@/components/common/MoneyInput"
import { gameOptionsState } from "@/state/modoo-state"
import { useRecoilState } from "recoil"

export default function StartMoneyForm() {
  const [gameOptions, setGameOptions] = useRecoilState(gameOptionsState)

  function handleChange(value: number) {
    setGameOptions({
      ...gameOptions,
      money: value,
    })
  }

  return (
    <MoneyInput
      value={gameOptions.money}
      onChange={handleChange}
      usePreset={false}
    />
  )
}
