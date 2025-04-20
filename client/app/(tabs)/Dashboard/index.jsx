import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView, ThemedText } from "../../../components/ThemedComponents";
import DashboardContent from "../../../components/DashboardContent/DashboardContent";
import { useUser } from "@/context/UserContext";
import PetsTab from "@/components/DashboardContent/PetsTab";
import DashboardHeader from "@/components/DashboardContent/DashboardHeader";
import DashboardData from "@/components/DashboardContent/DashboardData";
import DashboardDrawer from "@/components/DashboardContent/DashboardDrawer";
import { usePhoto } from "../../../context/PhotoContext";

export default function Dashboard() {
  const { userData } = useUser();
  const [selectedTab, setSelectedTab] = useState(0);
  const [closed, setClosed] = useState(true);
  const { setUpdate } = usePhoto();

  const pets = userData.posts || {};
  const key = String(selectedTab + 1);
  const petData = pets[key];
  const history = Array.isArray(petData?.history) ? petData.history : [];
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );

  return (
    <>
      <DashboardDrawer closed={closed} setClosed={setClosed} />
      <ThemedView scrollable style={styles.dashboard}>
        <DashboardHeader petCount={Object.keys(pets).length} />
        <PetsTab
          pets={userData.posts}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <View style={styles.heading}>
          {!petData && (
            <ThemedText
              style={{ fontSize: 16, marginHorizontal: 8, marginVertical: 8 }}
            >
              Scan a pet!
            </ThemedText>
          )}
          <DashboardContent
            sortedHistory={sortedHistory}
            selected={selectedTab}
          />
        </View>
        <DashboardData
          sortedHistory={sortedHistory}
          id={key}
          setSelected={setSelectedTab}
          setClosed={setClosed}
          setUpdate={setUpdate}
        />
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
    transform: [{ translateY: -285 }],
    width: "90%",
    marginLeft: "5%",
  },
});
