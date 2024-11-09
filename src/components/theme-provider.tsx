"use client"

import { ThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes"

export function BoardgameThemeProvider({children, ...props}: ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
