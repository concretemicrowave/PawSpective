import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCamera,
  faClipboardList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 5,
        },
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            bottom: 25,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 25,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: Colors[colorScheme ?? "light"].border,
            // shadowColor: "white",
            // shadowOffset: { width: 0, height: 10 },
            // shadowRadius: 10,
            // shadowOpacity: 0.15,
            backgroundColor: Colors[colorScheme ?? "light"].backgroundGrey,
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
            <FontAwesomeIcon icon={faCamera} size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard/index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faClipboardList} size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account/index"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
