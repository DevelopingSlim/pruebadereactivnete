"use client"

import { useState, useEffect } from "react"
import { Dimensions } from "react-native"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      const { width } = Dimensions.get("window")
      setIsMobile(width < 768)
    }

    checkIfMobile()

    const subscription = Dimensions.addEventListener("change", checkIfMobile)

    return () => {
      subscription.remove()
    }
  }, [])

  return isMobile
}

