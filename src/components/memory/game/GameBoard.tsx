import { atom, useAtom } from "jotai"
import { useEffect } from "react"

export interface Card {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

export type Board = Card[]

export const boardAtom = atom<Board>([])
export const flippedCardsAtom = atom<number[]>([])
export const matchesFoundAtom = atom<number>(0)

const createBoard = (): Board => {
  const symbols = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥝"]
  const board = [...symbols, ...symbols] // 8쌍의 그림 생성
  shuffle(board)
  return board.map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false,
  }))
}

// 배열 셔플 함수 (Fisher-Yates 알고리즘)
const shuffle = (array: string[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export default function GameBoard() {
  const [board, setBoard] = useAtom(boardAtom)
  const [flippedCards, setFlippedCards] = useAtom(flippedCardsAtom)
  const [matchesFound, setMatchesFound] = useAtom(matchesFoundAtom)

  // 게임 초기화
  useEffect(() => {
    setBoard(createBoard())
  }, [setBoard])

  // 카드 매칭 확인
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      if (board[first].symbol === board[second].symbol) {
        setBoard((prevBoard) =>
          prevBoard.map((card) =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true, isFlipped: true }
              : card,
          ),
        )
        setMatchesFound((prev) => prev + 1)
      } else {
        setTimeout(() => {
          setBoard((prevBoard) =>
            prevBoard.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card,
            ),
          )
        }, 1000) // 1초 후 카드 숨김
      }
      setFlippedCards([])
    }
  }, [flippedCards, board, setBoard, setFlippedCards, setMatchesFound])

  // 카드 클릭 처리
  const handleCardClick = (id: number): void => {
    if (flippedCards.length < 2 && !board[id].isFlipped) {
      setBoard((prevBoard) =>
        prevBoard.map((card) =>
          card.id === id ? { ...card, isFlipped: true } : card,
        ),
      )
      setFlippedCards((prev) => [...prev, id])
    }
  }

  // 게임 리셋
  const resetGame = (): void => {
    setBoard(createBoard())
    setFlippedCards([])
    setMatchesFound(0)
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">같은 그림 찾기</h1>
      <div className="grid grid-cols-4 gap-4">
        {board.map((card) => (
          <div
            key={card.id}
            className={`w-20 h-20 flex items-center justify-center text-4xl cursor-pointer rounded-lg transition-all duration-300 ${
              card.isMatched
                ? "bg-green-200"
                : card.isFlipped
                  ? "bg-white"
                  : "bg-gray-300"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.symbol : "?"}
          </div>
        ))}
      </div>
      {matchesFound === 8 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            축하합니다! 모든 카드를 맞췄습니다.
          </h2>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={resetGame}
          >
            게임 다시 시작
          </button>
        </div>
      )}
    </div>
  )
}
