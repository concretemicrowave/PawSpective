import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ThemedText } from "./ThemedComponents";

export default function HealthStatus({ status, loading }) {
  const getColor = () => {
    switch (status) {
      case "Good":
        return "#17C964";
      case "Cautious":
        return "#E9D502";
      case "Dangerous":
        return "#d03533";
      default:
        return "gray";
    }
  };

  return (
    <View style={styles.healthScore}>
      <ThemedText style={styles.healthScoreText}>
        Health Score:{" "}
        <ThemedText style={styles.healthScoreText} type="title">
          {loading ? <ActivityIndicator /> : status || "Unknown"}
        </ThemedText>
      </ThemedText>
      <View style={[styles.healthBar, { backgroundColor: getColor() }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  healthScore: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 12,
    alignItems: "center",
  },
  healthScoreText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  healthBar: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    marginTop: 8,
  },
});
