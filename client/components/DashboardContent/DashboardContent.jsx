import { useUser } from "../../context/UserContext";
import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { DetailCards } from "../DetailCards/DetailCards";
import { useAuth } from "../../hooks/useAuth";
import HealthStatus from "../HealthStatus";

export default function DashboardContent({ selected }) {
  const { userData } = useUser();
  const [statusCache, setStatusCache] = useState({});
  const [loading, setLoading] = useState(false);
  const petData = userData.posts[selected];
  const { fetchHealthStatus } = useAuth();

  useEffect(() => {
    if (petData && !statusCache[selected]) {
      setLoading(true);
      fetchHealthStatus(petData, setLoading, (newStatus) => {
        setStatusCache((prevCache) => ({
          ...prevCache,
          [selected]: newStatus,
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
