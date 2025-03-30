import { useUser } from "../../context/UserContext";
import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { DetailCards } from "../DetailCards/DetailCards";
import { useAuth } from "../../hooks/useAuth";
import HealthStatus from "../HealthStatus"; // HealthStatus component

export default function DashboardContent({ selected }) {
  const { userData } = useUser();
  const [statusCache, setStatusCache] = useState({}); // Cache for status
  const [loading, setLoading] = useState(false); // Loading state
  const petData = userData.posts[selected]; // Pet data for the selected post
  const { fetchHealthStatus } = useAuth(); // Function to fetch health status

  // Fetch health status if it's not cached
  useEffect(() => {
    if (petData && !statusCache[selected]) {
      setLoading(true);
      fetchHealthStatus(petData, setLoading, (newStatus) => {
        setStatusCache((prevCache) => ({
          ...prevCache,
          [selected]: newStatus, // Save the new status to cache
        }));
      });
    }
  }, [selected, petData]);

  return (
    <View style={styles.container}>
      <HealthStatus status={statusCache[selected]} loading={loading} />
      <DetailCards
        age={petData?.age}
        weight={petData?.weight}
        symptoms={petData?.symptoms}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
