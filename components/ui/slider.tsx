"use client"

import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from "react-native-reanimated"
import { useTheme } from "@/components/theme-provider"

interface SliderProps {
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  style?: any
}

export function Slider({
  defaultValue = [0],
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  style,
  ...props
}: SliderProps) {
  const { theme } = useTheme()
  const [sliderWidth, setSliderWidth] = useState(0)
  const [value, setValue] = useState(defaultValue)

  const translateX = useSharedValue(((defaultValue[0] - min) / (max - min)) * sliderWidth)

  const updateValue = (newX: number) => {
    if (sliderWidth === 0) return

    const percentage = Math.max(0, Math.min(1, newX / sliderWidth))
    const rawValue = min + percentage * (max - min)
    const steppedValue = Math.round(rawValue / step) * step
    const clampedValue = Math.max(min, Math.min(max, steppedValue))

    setValue([clampedValue])
    onValueChange?.([clampedValue])
  }

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      const newX = Math.max(0, Math.min(sliderWidth, e.translationX + translateX.value))
      translateX.value = newX
      runOnJS(updateValue)(newX)
    })
    .onEnd(() => {
      // Optional: Add any animations or effects when the gesture ends
    })

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const trackActiveStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value,
    }
  })

  return (
    <GestureHandlerRootView>
      <View
        style={[styles.container, style]}
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width - 20)} // Subtract thumb width
        {...props}
      >
        <View style={[styles.track, { backgroundColor: theme.colors.muted + "30" }]}>
          <Animated.View style={[styles.trackActive, { backgroundColor: theme.colors.primary }, trackActiveStyle]} />
        </View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.thumb, { backgroundColor: theme.colors.primary }, thumbStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    justifyContent: "center",
  },
  track: {
    height: 4,
    borderRadius: 2,
    width: "100%",
  },
  trackActive: {
    height: 4,
    borderRadius: 2,
    position: "absolute",
    left: 0,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    left: 0,
    transform: [{ translateX: 0 }],
  },
})

