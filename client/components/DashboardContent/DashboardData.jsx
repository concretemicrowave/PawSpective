import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedComponents";
import HealthStatus from "../HealthStatus";

export default function DashboardData({ latestEntry }) {
  return (
    <>
      <View style={styles.container}>
        <HealthStatus
          status={latestEntry.health_status}
          score={latestEntry.score}
        />
        <ThemedText type="subtitle" style={styles.title}>
          PROGRESS
        </ThemedText>
        <ThemedText>Insert graph of progress here</ThemedText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    opacity: 0.8,
    fontSize: 18,
    marginBottom: 6,
  },
});
