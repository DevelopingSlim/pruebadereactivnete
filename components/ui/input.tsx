"use client"
import { TextInput, StyleSheet, View } from "react-native"
import { useTheme } from "@/components/theme-provider"

interface InputProps {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  style?: any
}

export function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  style,
  ...props
}: InputProps) {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholderTextColor={theme.colors.muted}
        style={[
          styles.input,
          {
            color: theme.colors.foreground,
          },
        ]}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
})

