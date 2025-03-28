"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import Animated, { FadeInUp, FadeInRight } from "react-native-reanimated"
import { Trophy, ChevronRight, Gift, Clock, Users, Award } from "lucide-react-native"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"

export default function ChallengesScreen() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("active")

  const tabs = [
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "rewards", label: "Rewards" },
  ]

  // Mock challenges data
  const activeChallenges = [
    {
      id: "1",
      title: "10,000 Steps Daily",
      description: "Walk 10,000 steps every day for a week",
      progress: 70,
      daysLeft: 3,
      participants: 1245,
      reward: "Entry to $100 Gift Card Draw",
      image: require("@/assets/images/challenge-1.png"),
    },
    {
      id: "2",
      title: "Sleep Champion",
      description: "Sleep 8 hours every night for 5 days",
      progress: 40,
      daysLeft: 3,
      participants: 876,
      reward: "Premium Sleep Analysis",
      image: require("@/assets/images/challenge-2.png"),
    },
    {
      id: "3",
      title: "Protein Power",
      description: "Consume at least 100g of protein daily",
      progress: 25,
      daysLeft: 6,
      participants: 654,
      reward: "Nutrition Consultation",
      image: require("@/assets/images/challenge-3.png"),
    },
  ]

  const completedChallenges = [
    {
      id: "4",
      title: "Morning Workout",
      description: "Complete a workout before 9 AM for 5 days",
      reward: "Fitness Gear Discount",
      completedDate: "2 days ago",
      image: require("@/assets/images/challenge-4.png"),
    },
    {
      id: "5",
      title: "Hydration Hero",
      description: "Drink 3L of water daily for a week",
      reward: "Water Bottle",
      completedDate: "1 week ago",
      image: require("@/assets/images/challenge-5.png"),
    },
  ]

  const rewards = [
    {
      id: "1",
      title: "Fitness Gear Discount",
      description: "20% off at SportEquip",
      expiryDate: "Expires in 10 days",
      image: require("@/assets/images/reward-1.png"),
    },
    {
      id: "2",
      title: "Premium Workout Plan",
      description: "Access to exclusive workouts",
      expiryDate: "Never expires",
      image: require("@/assets/images/reward-2.png"),
    },
  ]

  const renderActiveChallenges = () => (
    <>
      {activeChallenges.map((challenge, index) => (
        <Animated.View key={challenge.id} entering={FadeInRight.delay(100 + index * 100).duration(500)}>
          <Card style={styles.challengeCard}>
            <Image source={challenge.image} style={styles.challengeImage} />
            <View style={styles.challengeContent}>
              <Text style={[styles.challengeTitle, { color: theme.colors.foreground }]}>{challenge.title}</Text>
              <Text style={[styles.challengeDescription, { color: theme.colors.muted }]}>{challenge.description}</Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={[styles.progressText, { color: theme.colors.foreground }]}>
                    Progress: {challenge.progress}%
                  </Text>
                  <View style={styles.daysLeft}>
                    <Clock size={12} color={theme.colors.warning} />
                    <Text style={[styles.daysLeftText, { color: theme.colors.warning }]}>
                      {challenge.daysLeft} days left
                    </Text>
                  </View>
                </View>
                <Progress value={challenge.progress} style={styles.progressBar} />
              </View>

              <View style={styles.challengeFooter}>
                <View style={styles.participants}>
                  <Users size={14} color={theme.colors.muted} />
                  <Text style={[styles.participantsText, { color: theme.colors.muted }]}>
                    {challenge.participants} participants
                  </Text>
                </View>
                <View style={styles.reward}>
                  <Gift size={14} color={theme.colors.primary} />
                  <Text style={[styles.rewardText, { color: theme.colors.primary }]}>{challenge.reward}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.challengeArrow}>
              <ChevronRight size={20} color={theme.colors.muted} />
            </TouchableOpacity>
          </Card>
        </Animated.View>
      ))}
    </>
  )

  const renderCompletedChallenges = () => (
    <>
      {completedChallenges.map((challenge, index) => (
        <Animated.View key={challenge.id} entering={FadeInRight.delay(100 + index * 100).duration(500)}>
          <Card style={styles.completedCard}>
            <Image source={challenge.image} style={styles.challengeImage} />
            <View style={styles.challengeContent}>
              <View style={styles.completedHeader}>
                <Text style={[styles.challengeTitle, { color: theme.colors.foreground }]}>{challenge.title}</Text>
                <Badge variant="success">Completed</Badge>
              </View>
              <Text style={[styles.challengeDescription, { color: theme.colors.muted }]}>{challenge.description}</Text>
              <Text style={[styles.completedDate, { color: theme.colors.muted }]}>
                Completed {challenge.completedDate}
              </Text>
              <View style={styles.reward}>
                <Award size={14} color={theme.colors.primary} />
                <Text style={[styles.rewardText, { color: theme.colors.primary }]}>Reward: {challenge.reward}</Text>
              </View>
            </View>
          </Card>
        </Animated.View>
      ))}
    </>
  )

  const renderRewards = () => (
    <>
      {rewards.map((reward, index) => (
        <Animated.View key={reward.id} entering={FadeInRight.delay(100 + index * 100).duration(500)}>
          <Card style={styles.rewardCard}>
            <Image source={reward.image} style={styles.rewardImage} />
            <View style={styles.rewardContent}>
              <Text style={[styles.rewardTitle, { color: theme.colors.foreground }]}>{reward.title}</Text>
              <Text style={[styles.rewardDescription, { color: theme.colors.muted }]}>{reward.description}</Text>
              <Text style={[styles.expiryDate, { color: theme.colors.warning }]}>{reward.expiryDate}</Text>
              <TouchableOpacity style={[styles.redeemButton, { backgroundColor: theme.colors.primaryLight }]}>
                <Text style={[styles.redeemText, { color: theme.colors.primary }]}>Redeem Now</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </Animated.View>
      ))}
    </>
  )

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>Challenges</Text>
        <Trophy size={24} color={theme.colors.primary} />
      </View>

      <Animated.View style={styles.pointsCard} entering={FadeInUp.delay(100).duration(500)}>
        <Card style={[styles.pointsCardContent, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.pointsTitle, { color: theme.colors.primaryForeground }]}>Your Challenge Points</Text>
          <Text style={[styles.pointsValue, { color: theme.colors.primaryForeground }]}>1,250</Text>
          <Text style={[styles.pointsSubtitle, { color: theme.colors.primaryForeground }]}>Level 5 Challenger</Text>
          <Progress
            value={70}
            style={styles.levelProgress}
            indicatorColor={theme.colors.primaryForeground}
            trackColor="rgba(255,255,255,0.3)"
          />
          <Text style={[styles.nextLevel, { color: theme.colors.primaryForeground }]}>250 points to Level 6</Text>
        </Card>
      </Animated.View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && [styles.activeTab, { backgroundColor: theme.colors.primaryLight }],
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, { color: activeTab === tab.id ? theme.colors.primary : theme.colors.muted }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === "active" && renderActiveChallenges()}
        {activeTab === "completed" && renderCompletedChallenges()}
        {activeTab === "rewards" && renderRewards()}
        <View style={styles.spacer} />
      </ScrollView>
    </View>
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
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
  pointsCard: {
    marginBottom: 20,
  },
  pointsCardContent: {
    padding: 16,
    alignItems: "center",
  },
  pointsTitle: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 36,
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  pointsSubtitle: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginBottom: 12,
  },
  levelProgress: {
    width: "100%",
    height: 8,
    marginBottom: 8,
  },
  nextLevel: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  challengeCard: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
  },
  completedCard: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
  },
  rewardCard: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
  },
  challengeImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  rewardImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  challengeContent: {
    flex: 1,
    marginLeft: 12,
  },
  rewardContent: {
    flex: 1,
    marginLeft: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 4,
  },
  rewardTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    marginBottom: 8,
    lineHeight: 18,
  },
  rewardDescription: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    marginBottom: 8,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  daysLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  daysLeftText: {
    fontSize: 10,
    fontFamily: "Inter-Medium",
    marginLeft: 4,
  },
  progressBar: {
    height: 6,
  },
  challengeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  participants: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantsText: {
    fontSize: 10,
    fontFamily: "Inter-Regular",
    marginLeft: 4,
  },
  reward: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardText: {
    fontSize: 10,
    fontFamily: "Inter-Medium",
    marginLeft: 4,
  },
  challengeArrow: {
    justifyContent: "center",
  },
  completedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  completedDate: {
    fontSize: 10,
    fontFamily: "Inter-Regular",
    marginBottom: 8,
  },
  expiryDate: {
    fontSize: 10,
    fontFamily: "Inter-Medium",
    marginBottom: 12,
  },
  redeemButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  redeemText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  spacer: {
    height: 40,
  },
})

