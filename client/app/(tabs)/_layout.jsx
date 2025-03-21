import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faRectangleList } from "@fortawesome/free-solid-svg-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 14,
        },
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            height: 100,
            paddingTop: 10,
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCamera} size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard/index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faRectangleList} size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
