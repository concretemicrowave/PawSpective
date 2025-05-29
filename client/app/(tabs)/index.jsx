import { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
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

export default function Dashboard() {
  const { userData, refetchUser } = useUser();
  const { setUpdate } = usePhoto();
  const [visible, setVisible] = useState(false);
  const { shouldReload, acknowledgeReload } = useReload();
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Stats");

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
      {petData && (
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setVisible(true)}
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
      <SwitchPetDrawer
        pets={userData.posts}
        visible={visible}
        setVisible={setVisible}
        selectedPostId={selectedPostId}
        setSelectedTab={setSelectedPostId}
      />
      <View style={styles.tabContainer}>
        {["Stats", "Progress"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <ThemedText
              style={
                selectedTab === tab ? styles.tabTextActive : styles.tabText
              }
              {...(selectedTab === tab && { type: "subtitle" })}
            >
              {tab}
            </ThemedText>
          </TouchableOpacity>
        ))}
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
  switchButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 105,
    marginBottom: 10,
  },
  switchButtonText: {
    fontSize: 18,
    maxWidth: "90%",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    padding: 4,
    width: "90%",
    borderRadius: 12,
    alignSelf: "center",
  },
  tabButton: {
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "transparent",
    flex: 1,
  },
  tabButtonActive: {
    backgroundColor: "#ddd",
  },
  tabText: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: "center",
  },
  tabTextActive: {
    fontSize: 16,
    opacity: 1,
    textAlign: "center",
    marginTop: 2,
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
