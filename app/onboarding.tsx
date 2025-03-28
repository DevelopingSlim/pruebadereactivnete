"use client"

import { useRef } from "react"
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { router } from "expo-router"
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

const { width, height } = Dimensions.get("window")

const slides = [
  {
    id: "1",
    title: "Welcome to Kinexly",
    description: "Your AI-powered fitness companion to help you achieve your health goals",
    image: require("@/assets/images/onboarding-1.png"),
  },
  {
    id: "2",
    title: "Personalized Diet Plans",
    description: "Get AI-generated meal plans tailored to your specific needs and preferences",
    image: require("@/assets/images/onboarding-2.png"),
  },
  {
    id: "3",
    title: "Track Your Progress",
    description: "Monitor your activity, nutrition, and sleep with detailed visual statistics",
    image: require("@/assets/images/onboarding-3.png"),
  },
  {
    id: "4",
    title: "Expert Guidance",
    description: "Chat with specialists to get answers to all your fitness and nutrition questions",
    image: require("@/assets/images/onboarding-4.png"),
  },
  {
    id: "5",
    title: "Fun Challenges",
    description: "Complete fitness challenges to earn rewards and stay motivated",
    image: require("@/assets/images/onboarding-5.png"),
  },
]

export default function Onboarding() {
  const { theme } = useTheme()
  const scrollX = useSharedValue(0)
  const scrollRef = useRef<Animated.ScrollView>(null)
  const currentIndex = useRef(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  const goToLogin = () => {
    router.push("/login")
  }

  const goToRegister = () => {
    router.push("/register")
  }

  const dotStyles = slides.map((_, index) => {
    return useAnimatedStyle(() => {
      const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

      const dotWidth = interpolate(scrollX.value, inputRange, [8, 16, 8], Extrapolate.CLAMP)

      const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolate.CLAMP)

      return {
        width: dotWidth,
        opacity,
        backgroundColor: theme.colors.primary,
      }
    })
  })

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image source={slide.image} style={styles.image} />
            </View>
            <Text style={[styles.title, { color: theme.colors.foreground }]}>{slide.title}</Text>
            <Text style={[styles.description, { color: theme.colors.muted }]}>{slide.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => {
          return <Animated.View key={index} style={[styles.dot, dotStyles[index]]} />
        })}
      </View>

      <View style={styles.buttonContainer}>
        <Button variant="default" onPress={goToRegister} style={styles.button}>
          Get Started
        </Button>
        <Button variant="outline" onPress={goToLogin} style={styles.button}>
          I already have an account
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    marginTop: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
    marginBottom: 20,
  },
  button: {
    marginVertical: 8,
  },
})

