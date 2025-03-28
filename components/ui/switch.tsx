"use client"

import { useState } from "react"
import { TouchableOpacity, StyleSheet, Animated } from "react-native"
import { useTheme } from "@/components/theme-provider"

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  style?: any
}

export function Switch({ checked = false, onCheckedChange, style, ...props }: SwitchProps) {
  const { theme } = useTheme()
  const [isChecked, setIsChecked] = useState(checked)
  const translateX = new Animated.Value(checked ? 20 : 0)

  const toggleSwitch = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    onCheckedChange?.(newValue)

    Animated.spring(translateX, {
      toValue: newValue ? 20 : 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start()
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleSwitch}
      style={[
        styles.track,
        {
          backgroundColor: isChecked ? theme.colors.primary : theme.colors.muted + "50",
        },
        style,
      ]}
      {...props}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: theme.colors.background,
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
})

