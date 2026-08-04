"use client"

type LetterStatus = "correct" | "present" | "absent" | "empty"

interface KeyboardProps {
  onVirtualKey: (key: string) => void
  getKeyStatus: (key: string) => LetterStatus
  currentGuessLength: number
}

const keyboardRows = [
  ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
  ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "BACK"],
  ["ENTER"],
]

export default function Keyboard({
  onVirtualKey,
  getKeyStatus,
  currentGuessLength,
}: KeyboardProps) {
  const isSubmitDisabled = currentGuessLength < 5

  return (
    <div className="w-full max-w-md flex flex-col gap-1.5 pb-4">
      {keyboardRows.map((row, _) => (
        <div key={row[0]} className="flex justify-center gap-1 w-full">
          {row.map((key) => {
            const status = getKeyStatus(key)

            let keyBg =
              "bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-neutral-100"
            if (status === "correct") {
              keyBg = "bg-emerald-600 text-white font-semibold"
            } else if (status === "present") {
              keyBg = "bg-amber-600 text-white font-semibold"
            } else if (status === "absent") {
              keyBg =
                "bg-neutral-900 text-neutral-600 border border-neutral-800"
            }

            if (key === "ENTER") {
              return (
                <button
                  key={key}
                  disabled={isSubmitDisabled}
                  onClick={() => onVirtualKey(key)}
                  className={`h-12 px-3 text-xs flex-1 rounded-lg flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer select-none active:scale-95 duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${
                    isSubmitDisabled
                      ? "bg-neutral-900 text-neutral-600 border border-neutral-800"
                      : "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold shadow-lg shadow-emerald-500/10"
                  }`}
                >
                  제출하기
                </button>
              )
            }

            const widthClass = key === "BACK" ? "px-3 text-xs w-16" : "w-9"

            return (
              <button
                key={key}
                onClick={() => onVirtualKey(key)}
                className={`h-12 ${widthClass} rounded-lg flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer select-none active:scale-95 duration-100 ${keyBg}`}
              >
                {key === "BACK" ? "지우기" : key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
