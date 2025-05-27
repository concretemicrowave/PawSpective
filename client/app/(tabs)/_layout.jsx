import { useRef } from "react";
import { View, Animated, Pressable, StyleSheet } from "react-native";
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

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handleFloatingPress = () => {
    if (latestPostId) {
      setUpdate(true);
      setPostId(latestPostId);
    }
    router.push("/update/update");
  };

  const animateIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 50,
        bounciness: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.6,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
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
            title: "Pets",
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
      {latestPostId && (
        <Pressable
          onPressIn={animateIn}
          onPressOut={animateOut}
          onPress={handleFloatingPress}
        >
          <Animated.View
            style={[
              styles.floatingButton,
              {
                transform: [{ translateX: -40 }, { scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            <MaterialCommunityIcons name="camera" size={32} color="white" />
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 55,
    left: "50%",
    backgroundColor: "#000",
    width: 80,
    height: 80,
    borderRadius: 35,
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
