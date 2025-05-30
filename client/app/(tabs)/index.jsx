import { useEffect, useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ThemedView, ThemedText } from "../../components/ThemedComponents";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useUser } from "@/context/UserContext";
import SwitchPetDrawer from "@/components/DashboardContent/SwitchPetDrawer/SwitchPetDrawer";
import DashboardHeader from "@/components/DashboardContent/DashboardHeader";
import DashboardData from "@/components/DashboardContent/DashboardData";
import LoadingSkeleton from "../../components/DashboardContent/LoadingSkeleton";
import { usePhoto } from "../../context/PhotoContext";
import { useReload } from "@/context/ReloadContext";
import * as Haptics from "expo-haptics";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const { userData, refetchUser } = useUser();
  const { setUpdate } = usePhoto();
  const [visible, setVisible] = useState(false);
  const { shouldReload, acknowledgeReload } = useReload();
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Stats");
  const [tabIndicatorAnim] = useState(new Animated.Value(0));
  const tabWidth = screenWidth * 0.9 * 0.5;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        await refetchUser();
        setLoading(false);
        acknowledgeReload();
      };
      if (shouldReload) fetchData();
    }, [shouldReload]),
  );

  const pets = userData.posts || {};
  const keys = Object.keys(pets);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    if (keys.length > 0) {
      const latestKey = String(Math.max(...keys.map(Number)));
      setSelectedPostId(latestKey);
    }
  }, [keys.length]);

  const petData = pets[selectedPostId];
  const history = Array.isArray(petData?.history) ? petData.history : [];
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );
  const latestEntry = sortedHistory[0] || null;

  const handleTabSwitch = (tab) => {
    const toValue = tab === "Stats" ? 0 : tabWidth;
    Haptics.selectionAsync();
    Animated.timing(tabIndicatorAnim, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setSelectedTab(tab);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <LoadingSkeleton />
      </View>
    );
  }

  return (
    <ThemedView scrollable style={styles.dashboard}>
      <DashboardHeader petCount={keys.length} />
      <View style={styles.switchWrapper}>
        {petData && (
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setVisible(true);
            }}
          >
            <MaterialCommunityIcons name="swap-horizontal" size={24} />
            <ThemedText
              type="subtitle"
              style={styles.switchButtonText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {petData.name}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
      <SwitchPetDrawer
        pets={userData.posts}
        visible={visible}
        setVisible={setVisible}
        selectedPostId={selectedPostId}
        setSelectedTab={setSelectedPostId}
      />
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          <Animated.View
            style={[
              styles.highlight,
              {
                width: tabWidth,
                transform: [{ translateX: tabIndicatorAnim }],
              },
            ]}
          />
          {["Stats", "Progress"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tabButton}
              onPress={() => handleTabSwitch(tab)}
            >
              <ThemedText
                style={
                  selectedTab === tab ? styles.tabTextActive : styles.tabText
                }
              >
                {tab}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {selectedTab === "Stats" && (
        <View style={styles.content}>
          {!petData || !latestEntry ? (
            <ThemedText style={styles.emptyText}>Scan a pet!</ThemedText>
          ) : (
            <DashboardContent
              latestEntry={latestEntry}
              id={selectedPostId}
              setUpdate={setUpdate}
            />
          )}
        </View>
      )}
      {selectedTab === "Progress" && petData && (
        <DashboardData history={sortedHistory} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    height: "100%",
  },
  switchWrapper: {
    marginHorizontal: 20,
    marginTop: 105,
    marginBottom: 10,
  },
  switchButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  switchButtonText: {
    fontSize: 18,
    maxWidth: "90%",
  },
  tabWrapper: {
    alignItems: "center",
    marginBottom: 8,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    width: "90%",
    position: "relative",
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#f0f0f0",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    opacity: 0.6,
  },
  tabTextActive: {
    fontSize: 16,
    opacity: 1,
  },
  highlight: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#ddd",
    borderRadius: 8,
    top: 0,
    left: 0,
    zIndex: 0,
  },
  content: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    width: "90%",
    padding: 12,
    paddingBottom: 0,
    marginHorizontal: 20,
    minHeight: 350,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.8,
  },
});
