"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import {
  User,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Shield,
  Globe,
  Heart,
} from "lucide-react-native"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/hooks/use-auth"

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(theme.name === "dark")

  const handleThemeToggle = (value) => {
    setDarkMode(value)
    setTheme(value ? "dark" : "light")
  }

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile Information",
          action: "navigate",
        },
        {
          icon: Bell,
          label: "Notifications",
          action: "toggle",
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: Lock,
          label: "Privacy & Security",
          action: "navigate",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: "Dark Mode",
          action: "toggle",
          value: darkMode,
          onToggle: handleThemeToggle,
        },
        {
          icon: Globe,
          label: "Language",
          action: "navigate",
          value: "English",
        },
        {
          icon: Heart,
          label: "Health Data Sharing",
          action: "navigate",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help & Support",
          action: "navigate",
        },
        {
          icon: Shield,
          label: "Terms & Privacy Policy",
          action: "navigate",
        },
      ],
    },
  ]

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>Settings</Text>
      </View>

      <Animated.View style={styles.profileCard} entering={FadeInUp.delay(100).duration(500)}>
        <Card style={styles.profileCardContent}>
          <View style={styles.profileInfo}>
            <Avatar style={styles.avatar}>
              <Avatar.Image source={require("@/assets/images/avatar.png")} />
              <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
            </Avatar>
            <View style={styles.profileText}>
              <Text style={[styles.profileName, { color: theme.colors.foreground }]}>{user?.name || "User Name"}</Text>
              <Text style={[styles.profileEmail, { color: theme.colors.muted }]}>
                {user?.email || "user@example.com"}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.editButton, { borderColor: theme.colors.border }]}>
            <Text style={[styles.editButtonText, { color: theme.colors.primary }]}>Edit</Text>
          </TouchableOpacity>
        </Card>
      </Animated.View>

      {settingsSections.map((section, sectionIndex) => (
        <Animated.View
          key={section.title}
          style={styles.section}
          entering={FadeInUp.delay(200 + sectionIndex * 100).duration(500)}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>{section.title}</Text>
          <Card style={styles.sectionCard}>
            {section.items.map((item, itemIndex) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity style={styles.settingItem} disabled={item.action === "toggle"}>
                  <View style={styles.settingItemLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: theme.colors.muted + "20" }]}>
                      <item.icon size={18} color={theme.colors.primary} />
                    </View>
                    <Text style={[styles.settingLabel, { color: theme.colors.foreground }]}>{item.label}</Text>
                  </View>

                  <View style={styles.settingItemRight}>
                    {item.action === "toggle" ? (
                      <Switch checked={item.value} onCheckedChange={item.onToggle} />
                    ) : item.action === "navigate" ? (
                      <>
                        {item.value && (
                          <Text style={[styles.settingValue, { color: theme.colors.muted }]}>{item.value}</Text>
                        )}
                        <ChevronRight size={18} color={theme.colors.muted} />
                      </>
                    ) : null}
                  </View>
                </TouchableOpacity>
                {itemIndex < section.items.length - 1 && <Separator style={styles.separator} />}
              </React.Fragment>
            ))}
          </Card>
        </Animated.View>
      ))}

      <Animated.View entering={FadeInUp.delay(500).duration(500)}>
        <TouchableOpacity style={[styles.logoutButton, { borderColor: theme.colors.border }]} onPress={logout}>
          <LogOut size={18} color={theme.colors.error} />
          <Text style={[styles.logoutText, { color: theme.colors.error }]}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>

      <Text style={[styles.versionText, { color: theme.colors.muted }]}>Version 1.0.0</Text>

      <View style={styles.spacer} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
  profileCard: {
    marginBottom: 24,
  },
  profileCardContent: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  profileText: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionCard: {
    padding: 0,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginRight: 8,
  },
  separator: {
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  spacer: {
    height: 40,
  },
})

