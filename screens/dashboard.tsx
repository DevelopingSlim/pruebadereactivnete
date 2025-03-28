"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import Animated, { FadeInUp, FadeInRight } from "react-native-reanimated"
import { Activity, Footprints, Moon, Apple, ArrowUp, ArrowDown, Sparkles } from "lucide-react-native"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar } from "@/components/ui/avatar"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/hooks/use-auth"

const { width } = Dimensions.get("window")

export default function DashboardScreen() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("today")

  const tabs = [
    { id: "today", label: "Today" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
  ]

  // Mock data for charts
  const stepsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [7500, 8200, 9800, 6500, 10200, 8700, 9300],
        color: () => theme.colors.primary,
        strokeWidth: 2,
      },
    ],
  }

  const sleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [7.2, 6.8, 8.1, 7.5, 6.9, 8.5, 7.8],
        color: () => theme.colors.secondary,
        strokeWidth: 2,
      },
    ],
  }

  const chartConfig = {
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    decimalPlaces: 0,
    color: () => theme.colors.primary,
    labelColor: () => theme.colors.muted,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.colors.primary,
    },
  }

  const sleepChartConfig = {
    ...chartConfig,
    color: () => theme.colors.secondary,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.colors.secondary,
    },
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.colors.foreground }]}>Hello, {user?.name || "User"}</Text>
          <Text style={[styles.date, { color: theme.colors.muted }]}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <Avatar>
          <Avatar.Image source={require("@/assets/images/avatar.png")} />
          <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
        </Avatar>
      </View>

      <Animated.View entering={FadeInUp.delay(100).duration(500)}>
        <Card style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={[styles.summaryTitle, { color: theme.colors.foreground }]}>Today's Summary</Text>
            <Sparkles size={20} color={theme.colors.primary} />
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <Activity size={20} color={theme.colors.primary} />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.foreground }]}>1,850</Text>
              <Text style={[styles.statLabel, { color: theme.colors.muted }]}>Calories</Text>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: theme.colors.secondaryLight }]}>
                <Footprints size={20} color={theme.colors.secondary} />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.foreground }]}>9,320</Text>
              <Text style={[styles.statLabel, { color: theme.colors.muted }]}>Steps</Text>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: theme.colors.accentLight }]}>
                <Moon size={20} color={theme.colors.accent} />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.foreground }]}>7.5h</Text>
              <Text style={[styles.statLabel, { color: theme.colors.muted }]}>Sleep</Text>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: theme.colors.warningLight }]}>
                <Apple size={20} color={theme.colors.warning} />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.foreground }]}>1,200</Text>
              <Text style={[styles.statLabel, { color: theme.colors.muted }]}>Calories</Text>
            </View>
          </View>

          <View style={styles.goalProgress}>
            <View style={styles.goalHeader}>
              <Text style={[styles.goalTitle, { color: theme.colors.foreground }]}>Daily Goal</Text>
              <Text style={[styles.goalPercentage, { color: theme.colors.primary }]}>78%</Text>
            </View>
            <Progress value={78} style={styles.progressBar} />
          </View>
        </Card>
      </Animated.View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && [styles.activeTab, { borderColor: theme.colors.primary }]]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, { color: activeTab === tab.id ? theme.colors.primary : theme.colors.muted }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View entering={FadeInUp.delay(200).duration(500)}>
        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={[styles.chartTitle, { color: theme.colors.foreground }]}>Steps</Text>
            <View style={styles.chartStats}>
              <ArrowUp size={16} color={theme.colors.success} />
              <Text style={[styles.chartStatsText, { color: theme.colors.success }]}>12% from last week</Text>
            </View>
          </View>
          <LineChart
            data={stepsData}
            width={width - 60}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300).duration(500)}>
        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={[styles.chartTitle, { color: theme.colors.foreground }]}>Sleep</Text>
            <View style={styles.chartStats}>
              <ArrowDown size={16} color={theme.colors.error} />
              <Text style={[styles.chartStatsText, { color: theme.colors.error }]}>5% from last week</Text>
            </View>
          </View>
          <LineChart
            data={sleepData}
            width={width - 60}
            height={180}
            chartConfig={sleepChartConfig}
            bezier
            style={styles.chart}
          />
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInRight.delay(400).duration(500)}>
        <Card style={styles.aiInsightsCard}>
          <View style={styles.insightsHeader}>
            <Text style={[styles.insightsTitle, { color: theme.colors.foreground }]}>AI Insights</Text>
            <Sparkles size={20} color={theme.colors.primary} />
          </View>
          <Text style={[styles.insightsText, { color: theme.colors.muted }]}>
            Based on your activity patterns, you could improve your sleep quality by going to bed 30 minutes earlier.
            Your step count is trending upward, great job keeping active!
          </Text>
        </Card>
      </Animated.View>

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
  date: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  summaryCard: {
    padding: 16,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    width: "48%",
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  goalProgress: {
    marginTop: 8,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  goalPercentage: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  progressBar: {
    height: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  chartCard: {
    padding: 16,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  chartStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartStatsText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    marginLeft: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  aiInsightsCard: {
    padding: 16,
    marginBottom: 20,
  },
  insightsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  insightsTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  insightsText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    lineHeight: 20,
  },
  spacer: {
    height: 40,
  },
})

