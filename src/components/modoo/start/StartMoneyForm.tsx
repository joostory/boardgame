import { gameOptionAtom } from "@/atom/modoo-atom"
import MoneyInput from "@/components/common/MoneyInput"
import { useAtom } from "jotai"

export default function StartMoneyForm() {
  const [gameOptions, setGameOptions] = useAtom(gameOptionAtom)

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
