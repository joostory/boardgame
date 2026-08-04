"use client"

import { ThemeProvider, type ThemeProviderProps } from "next-themes"

export function BoardgameThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
