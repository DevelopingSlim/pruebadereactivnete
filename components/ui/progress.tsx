"use client"
import { View, StyleSheet } from "react-native"
import { useTheme } from "@/components/theme-provider"

interface ProgressProps {
  value: number
  max?: number
  style?: any
  trackColor?: string
  indicatorColor?: string
}

export function Progress({ value, max = 100, style, trackColor, indicatorColor, ...props }: ProgressProps) {
  const { theme } = useTheme()
  const percentage = (Math.min(Math.max(0, value), max) / max) * 100

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor: trackColor || theme.colors.muted + "30",
        },
        style,
      ]}
      {...props}
    >
      <View
        style={[
          styles.indicator,
          {
            width: `${percentage}%`,
            backgroundColor: indicatorColor || theme.colors.primary,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  indicator: {
    height: "100%",
  },
})

