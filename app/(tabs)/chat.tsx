"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import Animated, { FadeInUp, FadeInRight, FadeInLeft } from "react-native-reanimated"
import { Send, User, Bot } from "lucide-react-native"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"

export default function Chat() {
  const { theme } = useTheme()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm your fitness specialist. How can I help you today?",
      sender: "specialist",
      timestamp: new Date(Date.now() - 3600000),
    },
  ])
  const flatListRef = useRef(null)

  const handleSend = () => {
    if (message.trim() === "") return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate specialist response after a delay
    setTimeout(() => {
      const specialistResponses = [
        "That's a great question about your fitness routine. I recommend focusing on progressive overload to continue seeing results.",
        "Regarding your diet, try to increase your protein intake to support muscle recovery and growth.",
        "For your sleep issues, consider establishing a consistent sleep schedule and avoiding screens an hour before bed.",
        "To improve your running performance, incorporate interval training into your routine twice a week.",
        "Hydration is key for optimal performance. Aim to drink at least 3 liters of water daily.",
      ]

      const randomResponse = specialistResponses[Math.floor(Math.random() * specialistResponses.length)]

      const specialistMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "specialist",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, specialistMessage])
    }, 1000)
  }

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages])

  const renderMessage = ({ item, index }) => {
    const isUser = item.sender === "user"
    const formattedTime = item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    return (
      <Animated.View
        entering={isUser ? FadeInRight.delay(100).duration(300) : FadeInLeft.delay(100).duration(300)}
        style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.specialistMessageContainer]}
      >
        {!isUser && (
          <Avatar style={styles.avatar}>
            <Bot size={20} color={theme.colors.background} />
          </Avatar>
        )}

        <View
          style={[
            styles.messageBubble,
            isUser
              ? [styles.userBubble, { backgroundColor: theme.colors.primary }]
              : [styles.specialistBubble, { backgroundColor: theme.colors.card }],
          ]}
        >
          <Text
            style={[styles.messageText, { color: isUser ? theme.colors.primaryForeground : theme.colors.foreground }]}
          >
            {item.text}
          </Text>
          <Text style={[styles.timestamp, { color: isUser ? theme.colors.primaryForeground : theme.colors.muted }]}>
            {formattedTime}
          </Text>
        </View>

        {isUser && (
          <Avatar style={styles.avatar}>
            <User size={20} color={theme.colors.background} />
          </Avatar>
        )}
      </Animated.View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>Fitness Specialist</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>Ask any fitness or nutrition questions</Text>
      </View>

      <Animated.View style={styles.infoCard} entering={FadeInUp.delay(100).duration(500)}>
        <Card style={styles.infoCardContent}>
          <Text style={[styles.infoTitle, { color: theme.colors.foreground }]}>How can I help you?</Text>
          <Text style={[styles.infoText, { color: theme.colors.muted }]}>Ask me about:</Text>
          <View style={styles.topicsList}>
            <Text style={[styles.topicItem, { color: theme.colors.muted }]}>• Workout routines and exercises</Text>
            <Text style={[styles.topicItem, { color: theme.colors.muted }]}>• Nutrition and diet recommendations</Text>
            <Text style={[styles.topicItem, { color: theme.colors.muted }]}>• Recovery and injury prevention</Text>
            <Text style={[styles.topicItem, { color: theme.colors.muted }]}>• Supplement advice</Text>
          </View>
        </Card>
      </Animated.View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      <View style={[styles.inputContainer, { backgroundColor: theme.colors.card }]}>
        <TextInput
          style={[styles.input, { color: theme.colors.foreground }]}
          placeholder="Type your message..."
          placeholderTextColor={theme.colors.muted}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSend}
          disabled={message.trim() === ""}
        >
          <Send size={20} color={theme.colors.primaryForeground} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  infoCard: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  infoCardContent: {
    padding: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 8,
  },
  topicsList: {
    marginTop: 4,
  },
  topicItem: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    lineHeight: 22,
  },
  messagesList: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    maxWidth: "80%",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  specialistMessageContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  avatar: {
    alignSelf: "flex-end",
    marginHorizontal: 8,
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: "100%",
  },
  userBubble: {
    borderTopRightRadius: 4,
  },
  specialistBubble: {
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: "Inter-Regular",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
})

