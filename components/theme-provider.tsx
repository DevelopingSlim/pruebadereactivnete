"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

type Theme = "light" | "dark"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: {
    name: Theme
    colors: {
      background: string
      foreground: string
      card: string
      cardForeground: string
      popover: string
      popoverForeground: string
      primary: string
      primaryForeground: string
      secondary: string
      secondaryForeground: string
      accent: string
      accentForeground: string
      muted: string
      mutedForeground: string
      border: string
      input: string
      ring: string
      success: string
      warning: string
      error: string
      primaryLight: string
      secondaryLight: string
      accentLight: string
      warningLight: string
    }
  }
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: {
    name: "light",
    colors: {
      background: "#FFFFFF",
      foreground: "#0A0A0A",
      card: "#F4F4F5",
      cardForeground: "#0A0A0A",
      popover: "#FFFFFF",
      popoverForeground: "#0A0A0A",
      primary: "#6366F1",
      primaryForeground: "#FFFFFF",
      secondary: "#22C55E",
      secondaryForeground: "#FFFFFF",
      accent: "#F59E0B",
      accentForeground: "#FFFFFF",
      muted: "#71717A",
      mutedForeground: "#A1A1AA",
      border: "#E4E4E7",
      input: "#E4E4E7",
      ring: "#6366F1",
      success: "#22C55E",
      warning: "#F59E0B",
      error: "#EF4444",
      primaryLight: "#EEF2FF",
      secondaryLight: "#DCFCE7",
      accentLight: "#FEF3C7",
      warningLight: "#FEF3C7",
    },
  },
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const colorScheme = useColorScheme()
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(storageKey)
        if (savedTheme) {
          setTheme(savedTheme as Theme)
        } else if (colorScheme) {
          setTheme(colorScheme)
        }
      } catch (error) {
        console.error("Failed to load theme:", error)
      }
    }

    loadTheme()
  }, [storageKey, colorScheme])

  const handleSetTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    } catch (error) {
      console.error("Failed to save theme:", error)
    }
  }

  const themeColors =
    theme === "dark"
      ? {
          background: "#09090B",
          foreground: "#FAFAFA",
          card: "#1C1C1F",
          cardForeground: "#FAFAFA",
          popover: "#09090B",
          popoverForeground: "#FAFAFA",
          primary: "#818CF8",
          primaryForeground: "#FFFFFF",
          secondary: "#4ADE80",
          secondaryForeground: "#FFFFFF",
          accent: "#FBBF24",
          accentForeground: "#FFFFFF",
          muted: "#71717A",
          mutedForeground: "#A1A1AA",
          border: "#27272A",
          input: "#27272A",
          ring: "#818CF8",
          success: "#4ADE80",
          warning: "#FBBF24",
          error: "#F87171",
          primaryLight: "#1E1E2F",
          secondaryLight: "#1E2F1E",
          accentLight: "#2F2A1E",
          warningLight: "#2F2A1E",
        }
      : initialState.theme.colors

  const value = {
    theme: {
      name: theme,
      colors: themeColors,
    },
    setTheme: handleSetTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

