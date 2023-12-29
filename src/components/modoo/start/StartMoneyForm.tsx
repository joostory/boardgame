import MoneyInput from "@/components/common/MoneyInput"
import { gameOptionState } from "@/state/modoo-state"
import { useRecoilState } from "recoil"

export default function StartMoneyForm() {
  const [gameOptions, setGameOptions] = useRecoilState(gameOptionState)

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
