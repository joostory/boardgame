import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMemo } from "react"

function ResetButton({
  onClick
}: {
  onClick: {(): void}
}) {
  return (
    <Button type="button" size={'sm'} onClick={onClick}>
      0 원
    </Button>
  )
}

function AddMoneyButton({
  value,
  onClick
}: {
  value: number,
  onClick: {(value: number): void}
}) {
  const text = useMemo(() => {
    if (value > 0) {
      return `+${value.toLocaleString()}`
    } else {
      return value.toLocaleString()
    }
  }, [value])

  const className = useMemo(() => {
    if (value > 0) {
      return `btn btn-sm btn-info`
    } else {
      return `btn btn-sm btn-error`
    }
  }, [value])

  return (
    <Button type="button" className={className} onClick={() => onClick(value)}>
      {text}원
    </Button>
  )
}

export default function MoneyInput({
  value,
  onChange,
  usePreset = true,
  preset = [100000, 10000, 1000, -100000, -10000, -1000]
}: {
  value: number,
  onChange: {(value: number): void},
  usePreset?: boolean,
  preset?: number[]
}) {
  const displayValue = useMemo(() => Number(value).toLocaleString(), [value])

  function handleChange(inputValue: string) {
    onChange(Number(inputValue.replaceAll(",", "")))
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center">
        <Input
          type='text' className="text-xl"
          value={displayValue} onChange={e => handleChange(e.target.value)}
        />
        <div className="flex justify-center items-center w-14 bg-base-300">
          원
        </div>
      </div>
      {usePreset &&
        <div className="flex flex-wrap gap-2 mt-4">
          {preset.map(it =>
            <AddMoneyButton
              key={it}
              value={it}
              onClick={v => onChange(value + it)}
            />
          )}
          <ResetButton onClick={() => onChange(0)} />
        </div>
      }
    </div>
  )
}
