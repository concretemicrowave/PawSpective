import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { usePhoto } from "@/context/PhotoContext";
import { useUser } from "@/context/UserContext";

export default function TabLayout() {
  const router = useRouter();
  const { setPostId, setUpdate } = usePhoto();
  const { latestPostId } = useUser();

  const handleFloatingPress = () => {
    if (latestPostId) {
      setUpdate(true);
      setPostId(latestPostId);
    }
    router.push("/update/update");
  };

  return (
    <View style={{ flex: 1 }}>
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
      <TouchableOpacity
        onPress={handleFloatingPress}
        style={styles.floatingButton}
      >
        <MaterialCommunityIcons name="camera" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 55,
    left: "50%",
    transform: [{ translateX: -35 }],
    backgroundColor: "#000",
    width: 80,
    height: 80,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    zIndex: 999,
  },
});
