"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuthState = async () => {
      try {
        const userData = await AsyncStorage.getItem("user")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Failed to get auth state:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthState()
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call to authenticate
    // For this demo, we'll simulate a successful login
    try {
      setIsLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: "1",
        name: "John Doe",
        email,
      }

      await AsyncStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would make an API call to register
    // For this demo, we'll simulate a successful registration
    try {
      setIsLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: Date.now().toString(),
        name,
        email,
      }

      await AsyncStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

