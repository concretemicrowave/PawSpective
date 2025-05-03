import { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView, ThemedText } from "../../../components/ThemedComponents";
import DashboardContent from "../../../components/DashboardContent/DashboardContent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useUser } from "@/context/UserContext";
import SwitchPetDrawer from "@/components/DashboardContent/SwitchPetDrawer";
import DashboardHeader from "@/components/DashboardContent/DashboardHeader";
import DashboardData from "@/components/DashboardContent/DashboardData";
import DashboardDrawer from "@/components/DashboardContent/DashboardDrawer";
import { usePhoto } from "../../../context/PhotoContext";

export default function Dashboard() {
  const { userData } = useUser();
  const [selectedTab, setSelectedTab] = useState(1);
  const [closed, setClosed] = useState(true);
  const { setUpdate } = usePhoto();
  const [visible, setVisible] = useState(false);

  const pets = userData.posts || {};

  useEffect(() => {
    const keys = Object.keys(pets);
    if (keys.length > 0) {
      const latestKey = Math.max(...keys.map(Number));
      setSelectedTab(latestKey - 1);
    }
  }, [pets]);

  const key = String(selectedTab + 1);
  const petData = pets[key];
  const history = Array.isArray(petData?.history) ? petData.history : [];
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );
  const latestEntry = Array.isArray(sortedHistory) ? sortedHistory[0] : null;

  return (
    <>
      <DashboardDrawer closed={closed} setClosed={setClosed} />
      <ThemedView scrollable style={styles.dashboard}>
        <DashboardHeader petCount={Object.keys(pets).length} />
        {petData && (
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setVisible(true)}
          >
            <MaterialCommunityIcons name="swap-horizontal" size={24} />
            <ThemedText type="subtitle" style={styles.switchButtonText}>
              {petData.name}
            </ThemedText>
          </TouchableOpacity>
        )}
        <SwitchPetDrawer
          pets={userData.posts}
          visible={visible}
          setVisible={setVisible}
          setSelectedTab={setSelectedTab}
        />
        <View style={[styles.heading, !petData && { marginTop: 110 }]}>
          {!petData || !latestEntry ? (
            <ThemedText
              style={{
                fontSize: 16,
                opacity: 0.8,
              }}
            >
              Scan a pet!
            </ThemedText>
          ) : (
            <DashboardContent
              latestEntry={latestEntry}
              setClosed={setClosed}
              id={petData.id}
              setUpdate={setUpdate}
            />
          )}
        </View>
        {petData && <DashboardData history={sortedHistory} />}
      </ThemedView>
      <DashboardDrawer closed={closed} setClosed={setClosed} />
    </>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    height: "100%",
  },
  heading: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    width: "90%",
    padding: 12,
    paddingBottom: 0,
    marginHorizontal: 20,
    minHeight: 250,
  },
  switchButton: {
    backgroundColor: "#e6e6e6",
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  switchButtonText: {
    fontSize: 18,
  },
});
