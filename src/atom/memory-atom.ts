import { MemoryCard } from "@/domain/memory"
import { atom } from "jotai"
import { DateTime } from "luxon"

export const memoryCardsAtom = atom<MemoryCard[]>([])
export const revealedCardValuesAtom = atom<string[]>([])
export const selectedCardsAtom = atom<MemoryCard[]>([])
export const selectedCountAtom = atom<number>(0)
export const gameStateAtom = atom<string>("READY")
export const gameStartTimeAtom = atom<DateTime>()
