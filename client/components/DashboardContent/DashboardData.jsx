import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedComponents";
import HealthStatus from "../HealthStatus";

export default function DashboardData({ latestEntry }) {
  return (
    <>
      <View style={styles.container}>
        <ThemedText type="subtitle" style={styles.title}>
          Progress
        </ThemedText>
        <HealthStatus
          status={latestEntry.health_status}
          score={latestEntry.score}
        />
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
    fontSize: 22,
    marginBottom: 6,
  },
});
