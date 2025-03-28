"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useTheme } from "@/components/theme-provider"

interface ButtonProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
  style?: any
}

export function Button({
  children,
  variant = "default",
  size = "default",
  onPress,
  disabled = false,
  loading = false,
  style,
  ...props
}: ButtonProps) {
  const { theme } = useTheme()

  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: theme.colors.border,
          borderWidth: 1,
          color: theme.colors.foreground,
        }
      case "secondary":
        return {
          backgroundColor: theme.colors.secondary,
          color: theme.colors.secondaryForeground,
        }
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: theme.colors.foreground,
        }
      case "link":
        return {
          backgroundColor: "transparent",
          color: theme.colors.primary,
          paddingVertical: 0,
          paddingHorizontal: 0,
        }
      default:
        return {
          backgroundColor: theme.colors.primary,
          color: theme.colors.primaryForeground,
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
          fontSize: 14,
        }
      case "lg":
        return {
          paddingVertical: 14,
          paddingHorizontal: 24,
          fontSize: 16,
        }
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: 14,
        }
    }
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: variantStyles.borderWidth,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variantStyles.color} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: variantStyles.color,
              fontSize: sizeStyles.fontSize,
            },
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontFamily: "Inter-Medium",
    textAlign: "center",
  },
})

