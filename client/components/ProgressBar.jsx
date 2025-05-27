import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedComponents";

export function ProgressBar({ progress, average, type }) {
  const goal = average != null ? average : 100;
  const fillPercent =
    progress <= goal
      ? `${(progress / goal) * 100}%`
      : `${(goal / progress) * 100}%`;
  const diff = progress - goal;
  let statusText = "";
  if (type !== "age") {
    if (diff > 0) {
      statusText = `${diff} kg cut`;
    } else if (diff < 0) {
      statusText = `${Math.abs(diff)} kg bulk`;
    } else {
      statusText = "Maintain";
    }
  }

  return (
    <View style={styles.container}>
      {type !== "Age" && (
        <ThemedText style={styles.statusLabel}>{statusText}</ThemedText>
      )}
      {type === "Age" && average != null && (
        <View style={styles.ageLabelContainer}>
          <ThemedText style={styles.ageLabel}>{average}</ThemedText>
        </View>
      )}
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: fillPercent }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 4,
    marginTop: "auto",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
  barBackground: {
    width: "100%",
    height: 12,
    backgroundColor: "#ddd",
    borderRadius: 6,
    overflow: "hidden",
    position: "relative",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#000",
    borderRadius: 50,
  },
  ageLabelContainer: {
    position: "absolute",
    overflow: "visible",
    right: 0,
    top: -28,
  },
  ageLabel: {
    fontSize: 14,
  },
});
