import { MemoryCard } from "@/domain/memory"
import { atom } from "jotai"

export const memoryCardsAtom = atom<MemoryCard[]>([])
export const revealedCardValuesAtom = atom<string[]>([])
export const selectedCardsAtom = atom<MemoryCard[]>([])
