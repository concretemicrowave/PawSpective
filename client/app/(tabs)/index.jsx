import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ThemedView } from "../../components/ThemedComponents";
import { useUser } from "@/context/UserContext";
import { usePhoto } from "../../context/PhotoContext";
import { useReload } from "@/context/ReloadContext";
import * as Haptics from "expo-haptics";
import DashboardHeader from "@/components/DashboardContent/DashboardHeader";
import SwitchPetDrawer from "@/components/DashboardContent/SwitchPetDrawer/SwitchPetDrawer";
import LoadingSkeleton from "@/components/DashboardContent/LoadingSkeleton";
import PetSwitcher from "@/components/DashboardContent/PetSwitcher";
import TabSwitcher from "@/components/DashboardContent/TabSwitcher";
import DashboardMainContent from "@/components/DashboardContent/DashboardMainContent";
import DashboardProgressContent from "@/components/DashboardContent/DashboardProgressContent";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const { userData, refetchUser } = useUser();
  const { setUpdate } = usePhoto();
  const { shouldReload, acknowledgeReload } = useReload();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Stats");
  const [tabIndicatorAnim] = useState(new Animated.Value(0));
  const [selectedPostId, setSelectedPostId] = useState(null);

  const tabWidth = screenWidth * 0.9 * 0.5;
  const pets = userData.posts || {};
  const keys = Object.keys(pets);

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
    Haptics.impactAsync();
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
      <PetSwitcher
        petData={petData}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setVisible(true);
        }}
      />
      <SwitchPetDrawer
        pets={userData.posts}
        visible={visible}
        setVisible={setVisible}
        selectedPostId={selectedPostId}
        setSelectedTab={setSelectedPostId}
      />
      <TabSwitcher
        selectedTab={selectedTab}
        onTabSwitch={handleTabSwitch}
        tabIndicatorAnim={tabIndicatorAnim}
        tabWidth={tabWidth}
      />
      {selectedTab === "Stats" ? (
        <DashboardMainContent
          petData={petData}
          latestEntry={latestEntry}
          id={selectedPostId}
          setUpdate={setUpdate}
        />
      ) : (
        <DashboardProgressContent history={sortedHistory} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    height: "100%",
  },
});
