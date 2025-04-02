import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView, ThemedText } from "../../../components/ThemedComponents";
import DashboardContent from "../../../components/DashboardContent/DashboardContent";
import { useUser } from "@/context/UserContext";
import PetsTab from "@/components/DashboardContent/PetsTab";
import DashboardHeader from "@/components/DashboardContent/DashboardHeader";
import DashboardData from "@/components/DashboardContent/DashboardData";

export default function Dashboard() {
  const { userData } = useUser();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ThemedView scrollable style={styles.dashboard}>
      <DashboardHeader petCount={userData.posts.length} />
      <PetsTab
        pets={userData.posts}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={styles.heading}>
        {userData.posts.length < 1 && (
          <ThemedText style={{ fontSize: 16 }}>Scan your first pet!</ThemedText>
        )}
        <DashboardContent selected={selectedTab} />
      </View>
      <DashboardData data={userData.posts} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    height: "100%",
  },
  heading: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    transform: [{ translateY: -285 }],
    width: "90%",
    marginLeft: "5%",
  },
});
