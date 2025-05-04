import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.text,
        tabBarInactiveTintColor: "rgba(0,0,0,0.5)",
        tabBarLabelStyle: { fontSize: 12, marginTop: 5 },
        tabBarStyle: {
          paddingTop: 8,
          height: 100,
          borderTopWidth: 1,
          borderTopColor: "rgba(0,0,0,0.05)",
          backgroundColor: Colors.light.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Camera",
          unmountOnBlur: true,
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
