"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ArrowLeft } from "lucide-react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/hooks/use-auth"

export default function RegisterScreen() {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const { register } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    if (!name || !email || !password) return

    setIsLoading(true)
    try {
      await register(name, email, password)
      // Navigation will be handled by the auth state change
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToLogin = () => {
    navigation.navigate("Login" as never)
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
          <Text style={[styles.title, { color: theme.colors.foreground }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.colors.muted }]}>Sign up to start your fitness journey</Text>
        </Animated.View>

        <Animated.View style={styles.form} entering={FadeInDown.delay(200).duration(500)}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.foreground }]}>Full Name</Text>
            <Input placeholder="Enter your full name" value={name} onChangeText={setName} />
          </View>

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
            <Input placeholder="Create a password" value={password} onChangeText={setPassword} secureTextEntry />
          </View>

          <Text style={[styles.termsText, { color: theme.colors.muted }]}>
            By signing up, you agree to our <Text style={{ color: theme.colors.primary }}>Terms of Service</Text> and{" "}
            <Text style={{ color: theme.colors.primary }}>Privacy Policy</Text>
          </Text>

          <Button onPress={handleRegister} style={styles.registerButton} disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </Animated.View>

        <Animated.View style={styles.footer} entering={FadeInDown.delay(300).duration(500)}>
          <Text style={[styles.footerText, { color: theme.colors.muted }]}>Already have an account? </Text>
          <TouchableOpacity onPress={goToLogin}>
            <Text style={[styles.signInText, { color: theme.colors.primary }]}>Sign In</Text>
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
  termsText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 24,
    lineHeight: 20,
  },
  registerButton: {
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
  signInText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
})

