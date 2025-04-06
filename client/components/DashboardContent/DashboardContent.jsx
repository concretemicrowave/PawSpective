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
  const { fetchHealthStatus } = useAuth();
  const pets = userData.posts || {};
  const key = String(selected + 1);
  const petData = pets[key];
  const history = petData?.history || {};
  const latestDate = Object.keys(history).sort(
    (a, b) => new Date(b) - new Date(a),
  )[0];
  const latestEntry = history[latestDate] || {};

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

  return petData ? (
    <View style={styles.container}>
      <HealthStatus status={statusCache[selected]} loading={loading} />
      <DetailCards
        age={latestEntry.age}
        weight={latestEntry.weight}
        symptoms={latestEntry.symptoms}
      />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
