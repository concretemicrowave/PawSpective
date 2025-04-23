import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].text,
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.5)",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 5,
        },
        tabBarStyle: Platform.select({
          ios: {
            paddingTop: 8,
            height: 100,
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.1)",
            backgroundColor: Colors["light"].background,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dog" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard/index"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account/index"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
