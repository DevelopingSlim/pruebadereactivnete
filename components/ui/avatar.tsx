"use client"

import type React from "react"
import { View, Image, Text, StyleSheet } from "react-native"
import { useTheme } from "@/components/theme-provider"

interface AvatarProps {
  children?: React.ReactNode
  style?: any
}

interface AvatarImageProps {
  source: any
  style?: any
}

interface AvatarFallbackProps {
  children: React.ReactNode
  style?: any
}

const Avatar = ({ children, style }: AvatarProps) => {
  const { theme } = useTheme()

  return <View style={[styles.avatar, { backgroundColor: theme.colors.muted }, style]}>{children}</View>
}

const AvatarImage = ({ source, style }: AvatarImageProps) => {
  return <Image source={source} style={[styles.image, style]} />
}

const AvatarFallback = ({ children, style }: AvatarFallbackProps) => {
  const { theme } = useTheme()

  return (
    <View style={[styles.fallback, style]}>
      <Text style={[styles.fallbackText, { color: theme.colors.background }]}>{children}</Text>
    </View>
  )
}

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
})

export { Avatar }

