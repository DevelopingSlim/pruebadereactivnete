"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { router } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/hooks/use-auth"

export default function Login() {
  const { theme } = useTheme()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) return

    setIsLoading(true)
    try {
      await login(email, password)
      router.replace("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    router.back()
  }

  const goToRegister = () => {
    router.push("/register")
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ArrowLeft size={24} color={theme.colors.foreground} />
        </TouchableOpacity>

        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <Text style={[styles.title, { color: theme.colors.foreground }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: theme.colors.muted }]}>Sign in to your account to continue</Text>
        </Animated.View>

        <Animated.View style={styles.form} entering={FadeInDown.delay(200).duration(500)}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.foreground }]}>Email</Text>
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.foreground }]}>Password</Text>
            <Input placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>Forgot password?</Text>
          </TouchableOpacity>

          <Button onPress={handleLogin} style={styles.loginButton} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </Animated.View>

        <Animated.View style={styles.footer} entering={FadeInDown.delay(300).duration(500)}>
          <Text style={[styles.footerText, { color: theme.colors.muted }]}>Don't have an account? </Text>
          <TouchableOpacity onPress={goToRegister}>
            <Text style={[styles.signUpText, { color: theme.colors.primary }]}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginBottom: 40,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginBottom: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  loginButton: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  signUpText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
})

