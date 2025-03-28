"use client"

import type React from "react"
import { View, StyleSheet } from "react-native"
import { useTheme } from "@/components/theme-provider"

interface CardProps {
  children: React.ReactNode
  style?: any
}

export function Card({ children, style, ...props }: CardProps) {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
})

