import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ThemedText } from "./ThemedComponents";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function HealthStatus({ score, loading }) {
  const getColor = () => {
    if (typeof score !== "number") return "gray";
    if (score >= 8) return "#17C964";
    if (score >= 5) return "#E9D502";
    return "#d03533";
  };

  const getWidth = () => {
    if (typeof score === "number") {
      const clampedScore = Math.max(0, Math.min(score, 10));
      return `${clampedScore * 10}%`;
    }
    return "0%";
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="heart-pulse" size={28} color="#FF6B6B" />
      </View>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <ThemedText style={styles.label}>Health Score</ThemedText>
          <ThemedText type="subtitle" style={styles.score}>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              `${score ?? "?"} / 10`
            )}
          </ThemedText>
        </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 14,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  iconContainer: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#e8e8e8",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  score: {
    fontSize: 16,
    fontWeight: "600",
  },
  healthBarContainer: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
  healthBar: {
    height: "100%",
    borderRadius: 5,
  },
});
