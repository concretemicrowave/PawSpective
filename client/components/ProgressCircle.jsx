import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedComponents";
import Svg, { Circle } from "react-native-svg";

function getProgressColor(percent) {
  if (percent < 50) return "#F44336";
  if (percent < 75) return "#FFC107";
  return "#4CAF50";
}

export default function ProgressCircle({ progress, target }) {
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min(progress, 100);
  const strokeDashoffset = circumference * (1 - progressPercent / 100);

  return (
    <View style={styles.row}>
      <View style={styles.container}>
        <Svg width={150} height={150}>
          <Circle
            cx="75"
            cy="75"
            r={radius}
            stroke="#eee"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="75"
            cy="75"
            r={radius}
            stroke={getProgressColor(progressPercent)}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            rotation="-90"
            origin="75, 75"
          />
        </Svg>
        <View style={styles.label}>
          <ThemedText type="subtitle" style={styles.value}>
            {progressPercent}%
          </ThemedText>
          <ThemedText style={styles.subtitle}>Weight Goal</ThemedText>
        </View>
      </View>
      <View style={styles.info}>
        <View>
          <ThemedText style={styles.infoTitle}>Target Weight</ThemedText>
          <ThemedText type="subtitle" style={styles.infoText}>
            {target}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  label: {
    position: "absolute",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
  },
  info: {
    flex: 1,
    borderRadius: 12,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 16,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  infoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1C1C1C",
  },
});
