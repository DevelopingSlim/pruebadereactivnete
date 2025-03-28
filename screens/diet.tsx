"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import Animated, { FadeInUp, FadeInRight } from "react-native-reanimated"
import { ChevronRight, Plus, Sparkles, Filter } from "lucide-react-native"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"

export default function DietScreen() {
  const { theme } = useTheme()
  const [mealType, setMealType] = useState("all")
  const [calories, setCalories] = useState([2000])
  const [protein, setProtein] = useState([150])
  const [vegetarian, setVegetarian] = useState(false)
  const [glutenFree, setGlutenFree] = useState(false)
  const [dairyFree, setDairyFree] = useState(false)

  const mealTypes = [
    { id: "all", label: "All" },
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
    { id: "snacks", label: "Snacks" },
  ]

  // Mock meal plan data
  const meals = [
    {
      id: "1",
      type: "breakfast",
      name: "Greek Yogurt with Berries",
      calories: 320,
      protein: 22,
      carbs: 40,
      fat: 8,
      image: require("@/assets/images/meal-1.png"),
    },
    {
      id: "2",
      type: "lunch",
      name: "Grilled Chicken Salad",
      calories: 450,
      protein: 35,
      carbs: 25,
      fat: 15,
      image: require("@/assets/images/meal-2.png"),
    },
    {
      id: "3",
      type: "dinner",
      name: "Salmon with Roasted Vegetables",
      calories: 520,
      protein: 40,
      carbs: 30,
      fat: 20,
      image: require("@/assets/images/meal-3.png"),
    },
    {
      id: "4",
      type: "snacks",
      name: "Protein Smoothie",
      calories: 280,
      protein: 25,
      carbs: 30,
      fat: 5,
      image: require("@/assets/images/meal-4.png"),
    },
  ]

  const filteredMeals = mealType === "all" ? meals : meals.filter((meal) => meal.type === mealType)

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>Diet Plan</Text>
        <Sheet>
          <SheetTrigger asChild>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.muted }]}>
              <Filter size={20} color={theme.colors.background} />
            </TouchableOpacity>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Diet Preferences</SheetTitle>
            </SheetHeader>
            <ScrollView style={styles.filterContent}>
              <View style={styles.filterSection}>
                <Text style={[styles.filterLabel, { color: theme.colors.foreground }]}>Daily Calories</Text>
                <Text style={[styles.filterValue, { color: theme.colors.primary }]}>{calories[0]} kcal</Text>
                <Slider defaultValue={calories} min={1200} max={3500} step={50} onValueChange={setCalories} />
              </View>

              <View style={styles.filterSection}>
                <Text style={[styles.filterLabel, { color: theme.colors.foreground }]}>Daily Protein</Text>
                <Text style={[styles.filterValue, { color: theme.colors.primary }]}>{protein[0]}g</Text>
                <Slider defaultValue={protein} min={50} max={250} step={5} onValueChange={setProtein} />
              </View>

              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: theme.colors.foreground }]}>
                  Dietary Restrictions
                </Text>

                <View style={styles.switchItem}>
                  <Text style={[styles.switchLabel, { color: theme.colors.foreground }]}>Vegetarian</Text>
                  <Switch checked={vegetarian} onCheckedChange={setVegetarian} />
                </View>

                <View style={styles.switchItem}>
                  <Text style={[styles.switchLabel, { color: theme.colors.foreground }]}>Gluten Free</Text>
                  <Switch checked={glutenFree} onCheckedChange={setGlutenFree} />
                </View>

                <View style={styles.switchItem}>
                  <Text style={[styles.switchLabel, { color: theme.colors.foreground }]}>Dairy Free</Text>
                  <Switch checked={dairyFree} onCheckedChange={setDairyFree} />
                </View>
              </View>

              <Button style={styles.applyButton}>Apply Filters</Button>
            </ScrollView>
          </SheetContent>
        </Sheet>
      </View>

      <Animated.View style={styles.generateCard} entering={FadeInUp.delay(100).duration(500)}>
        <Card style={styles.generateCardContent}>
          <View style={styles.generateCardHeader}>
            <Sparkles size={24} color={theme.colors.primary} />
            <Text style={[styles.generateCardTitle, { color: theme.colors.foreground }]}>Generate AI Diet Plan</Text>
          </View>
          <Text style={[styles.generateCardText, { color: theme.colors.muted }]}>
            Get a personalized monthly diet plan based on your goals and preferences
          </Text>
          <Button style={styles.generateButton}>Create Diet Plan</Button>
        </Card>
      </Animated.View>

      <View style={styles.mealTypesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mealTypesContent}>
          {mealTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.mealTypeButton,
                mealType === type.id && [styles.activeMealTypeButton, { backgroundColor: theme.colors.primaryLight }],
              ]}
              onPress={() => setMealType(type.id)}
            >
              <Text
                style={[
                  styles.mealTypeText,
                  { color: mealType === type.id ? theme.colors.primary : theme.colors.muted },
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>Today's Meals</Text>

        {filteredMeals.map((meal, index) => (
          <Animated.View key={meal.id} entering={FadeInRight.delay(100 + index * 100).duration(500)}>
            <Card style={styles.mealCard}>
              <Image source={meal.image} style={styles.mealImage} />
              <View style={styles.mealContent}>
                <Text style={[styles.mealType, { color: theme.colors.primary }]}>
                  {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                </Text>
                <Text style={[styles.mealName, { color: theme.colors.foreground }]}>{meal.name}</Text>
                <View style={styles.macros}>
                  <View style={styles.macroItem}>
                    <Text style={[styles.macroValue, { color: theme.colors.foreground }]}>{meal.calories}</Text>
                    <Text style={[styles.macroLabel, { color: theme.colors.muted }]}>kcal</Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={[styles.macroValue, { color: theme.colors.foreground }]}>{meal.protein}g</Text>
                    <Text style={[styles.macroLabel, { color: theme.colors.muted }]}>protein</Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={[styles.macroValue, { color: theme.colors.foreground }]}>{meal.carbs}g</Text>
                    <Text style={[styles.macroLabel, { color: theme.colors.muted }]}>carbs</Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={[styles.macroValue, { color: theme.colors.foreground }]}>{meal.fat}g</Text>
                    <Text style={[styles.macroLabel, { color: theme.colors.muted }]}>fat</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.mealArrow}>
                <ChevronRight size={20} color={theme.colors.muted} />
              </TouchableOpacity>
            </Card>
          </Animated.View>
        ))}

        <TouchableOpacity style={styles.addMealButton}>
          <Plus size={20} color={theme.colors.primary} />
          <Text style={[styles.addMealText, { color: theme.colors.primary }]}>Add Custom Meal</Text>
        </TouchableOpacity>

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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContent: {
    flex: 1,
    paddingTop: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginBottom: 8,
  },
  filterValue: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 8,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 16,
  },
  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  applyButton: {
    marginTop: 16,
  },
  generateCard: {
    marginBottom: 20,
  },
  generateCardContent: {
    padding: 16,
  },
  generateCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  generateCardTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginLeft: 8,
  },
  generateCardText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 16,
    lineHeight: 20,
  },
  generateButton: {
    width: "100%",
  },
  mealTypesContainer: {
    marginBottom: 20,
  },
  mealTypesContent: {
    paddingRight: 20,
  },
  mealTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  activeMealTypeButton: {
    borderRadius: 20,
  },
  mealTypeText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 16,
  },
  mealCard: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  mealContent: {
    flex: 1,
    marginLeft: 12,
  },
  mealType: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    marginBottom: 4,
  },
  mealName: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 8,
  },
  macros: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroItem: {
    alignItems: "center",
  },
  macroValue: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  macroLabel: {
    fontSize: 10,
    fontFamily: "Inter-Regular",
  },
  mealArrow: {
    justifyContent: "center",
  },
  addMealButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  addMealText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginLeft: 8,
  },
  spacer: {
    height: 40,
  },
})

