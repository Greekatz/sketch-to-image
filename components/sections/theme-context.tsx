"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  // Apply theme to HTML element
  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("sketch-theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Update HTML class and localStorage when theme changes
  useEffect(() => {
    const html = document.documentElement

    if (theme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }

    localStorage.setItem("sketch-theme", theme)

    // Add a visual indicator that the theme has changed
    const body = document.body
    body.classList.add("theme-changed")
    setTimeout(() => {
      body.classList.remove("theme-changed")
    }, 500)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useCustomTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useCustomTheme must be used within a CustomThemeProvider")
  }
  return context
}
