import { View, StyleSheet } from "react-native";
import { DetailCards } from "../DetailCards/DetailCards";
import HealthStatus from "../HealthStatus";

export default function DashboardContent({ sortedHistory, selected }) {
  const latestEntry = Array.isArray(sortedHistory) ? sortedHistory[0] : null;

  return latestEntry ? (
    <View style={styles.container}>
      <HealthStatus
        status={latestEntry.health_status}
        score={latestEntry.score}
      />
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
