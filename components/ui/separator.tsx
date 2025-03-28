"use client"
import { View, StyleSheet } from "react-native"
import { useTheme } from "@/components/theme-provider"

interface SeparatorProps {
  orientation?: "horizontal" | "vertical"
  style?: any
}

export function Separator({ orientation = "horizontal", style, ...props }: SeparatorProps) {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: theme.colors.border,
          height: orientation === "horizontal" ? 1 : "100%",
          width: orientation === "vertical" ? 1 : "100%",
        },
        style,
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    flexShrink: 0,
  },
})

