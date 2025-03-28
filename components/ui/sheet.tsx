"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView,
} from "react-native"
import { X } from "lucide-react-native"
import { useTheme } from "@/components/theme-provider"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

interface SheetProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface SheetTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

interface SheetContentProps {
  children: React.ReactNode
  side?: "bottom" | "top" | "left" | "right"
  className?: string
}

interface SheetHeaderProps {
  children: React.ReactNode
}

interface SheetTitleProps {
  children: React.ReactNode
}

const SheetContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({
  open: false,
  setOpen: () => {},
})

export function Sheet({ children, open: controlledOpen, onOpenChange }: SheetProps) {
  const [open, setOpen] = useState(false)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : open

  const handleOpenChange = (value: boolean) => {
    if (!isControlled) {
      setOpen(value)
    }
    onOpenChange?.(value)
  }

  return <SheetContext.Provider value={{ open: isOpen, setOpen: handleOpenChange }}>{children}</SheetContext.Provider>
}

export function SheetTrigger({ children, asChild = false }: SheetTriggerProps) {
  const { setOpen } = React.useContext(SheetContext)

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onPress: () => setOpen(true),
    })
  }

  return <TouchableOpacity onPress={() => setOpen(true)}>{children}</TouchableOpacity>
}

export function SheetContent({ children, side = "bottom", className }: SheetContentProps) {
  const { theme } = useTheme()
  const { open, setOpen } = React.useContext(SheetContext)
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current

  useEffect(() => {
    if (open) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start()
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
  }, [open, translateY])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.4)" }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.content,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  transform: [{ translateY }],
                },
                className,
              ]}
            >
              <SafeAreaView style={styles.safeArea}>
                <View style={styles.handle} />
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <X size={20} color={theme.colors.muted} />
                </TouchableOpacity>
                {children}
              </SafeAreaView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export function SheetHeader({ children }: SheetHeaderProps) {
  return <View style={styles.header}>{children}</View>
}

export function SheetTitle({ children }: SheetTitleProps) {
  const { theme } = useTheme()

  return <Text style={[styles.title, { color: theme.colors.foreground }]}>{children}</Text>
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    maxHeight: "80%",
  },
  safeArea: {
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E4E4E7",
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
})

