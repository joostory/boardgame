import { atom } from "jotai"
import type { DateTime } from "luxon"
import type { MemoryCard } from "@/domain/memory"

export const memoryCardsAtom = atom<MemoryCard[]>([])
export const revealedCardValuesAtom = atom<string[]>([])
export const selectedCardsAtom = atom<MemoryCard[]>([])
export const selectedCountAtom = atom<number>(0)
export const gameStateAtom = atom<string>("READY")
export const gameStartTimeAtom = atom<DateTime>()
