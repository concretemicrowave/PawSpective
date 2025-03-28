import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";

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
            height: 90,
            borderWidth: 1,
            borderColor: Colors["light"].border,
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
            <Feather name="camera" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard/index"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => (
            <Feather name="bar-chart-2" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account/index"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
