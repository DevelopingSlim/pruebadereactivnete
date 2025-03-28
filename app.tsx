"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { useFonts } from "expo-font"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Home, Utensils, MessageSquare, Trophy, Settings } from "lucide-react-native"
import * as SplashScreen from "expo-splash-screen"

// Providers
import { ThemeProvider, useTheme } from "@/components/theme-provider"
import { AuthProvider, useAuth } from "@/hooks/use-auth"

// Screens
import OnboardingScreen from "@/screens/onboarding"
import LoginScreen from "@/screens/login"
import RegisterScreen from "@/screens/register"
import DashboardScreen from "@/screens/dashboard"
import DietScreen from "@/screens/diet"
import ChatScreen from "@/screens/chat"
import ChallengesScreen from "@/screens/challenges"
import SettingsScreen from "@/screens/settings"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigator() {
  const { theme } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarLabelStyle: {
          fontFamily: "Inter-Medium",
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Diet"
        component={DietScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Utensils size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Trophy size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth()
  const { theme } = useTheme()

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.loadingText, { color: theme.colors.foreground }]}>Loading...</Text>
      </View>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      {!isAuthenticated ? (
        // Auth screens
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // App screens
        <Stack.Screen name="Main" component={TabNavigator} />
      )}
    </Stack.Navigator>
  )
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  })

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      // Hide splash screen
      SplashScreen.hideAsync()
    }
  }, [appIsReady, fontsLoaded])

  if (!appIsReady || !fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
})

