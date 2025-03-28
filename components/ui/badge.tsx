"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "@/components/theme-provider"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "success" | "warning" | "error"
  style?: any
}

export function Badge({ children, variant = "default", style, ...props }: BadgeProps) {
  const { theme } = useTheme()

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: theme.colors.secondary,
          color: theme.colors.secondaryForeground,
        }
      case "success":
        return {
          backgroundColor: theme.colors.success,
          color: theme.colors.primaryForeground,
        }
      case "warning":
        return {
          backgroundColor: theme.colors.warning,
          color: theme.colors.primaryForeground,
        }
      case "error":
        return {
          backgroundColor: theme.colors.error,
          color: theme.colors.primaryForeground,
        }
      default:
        return {
          backgroundColor: theme.colors.primary,
          color: theme.colors.primaryForeground,
        }
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <View style={[styles.badge, { backgroundColor: variantStyles.backgroundColor }, style]} {...props}>
      <Text style={[styles.text, { color: variantStyles.color }]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  text: {
    fontSize: 10,
    fontFamily: "Inter-Medium",
    textAlign: "center",
  },
})

