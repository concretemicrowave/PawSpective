import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ThemedText } from "./ThemedComponents";

export default function HealthStatus({ status, score, loading }) {
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

  const getWidth = () => {
    if (typeof score === "number") {
      const clampedScore = Math.max(0, Math.min(score, 10));
      return `${clampedScore * 10}%`;
    }
    return "0%";
  };

  return (
    <View style={styles.healthScore}>
      <ThemedText style={styles.healthScoreText}>
        Health Score:{" "}
        <ThemedText style={styles.healthScoreText} type="title">
          {loading ? <ActivityIndicator /> : (`${score} / 10` ?? "Unknown")}
        </ThemedText>
      </ThemedText>
      <View style={styles.healthBarContainer}>
        <View
          style={[
            styles.healthBar,
            {
              backgroundColor: getColor(),
              width: getWidth(),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  healthScore: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 10,
    padding: 12,
    alignItems: "center",
  },
  healthScoreText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  healthBarContainer: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    marginTop: 8,
  },
  healthBar: {
    height: "100%",
    borderRadius: 5,
  },
});
