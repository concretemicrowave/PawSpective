import { View, Text, StyleSheet } from "react-native";

export function ProgressBar({ progress, average }) {
  const maxValue = average * 2;
  const averagePosition = "50%";
  const progressWidth = `${(progress / maxValue) * 100}%`;

  return (
    <View style={styles.container}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>
      <View style={[styles.averageMarker, { left: averagePosition }]}>
        <View style={styles.markerLine} />
        <Text style={styles.markerText}>Avg.({average})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
  },
  progressBackground: {
    height: 12,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 6,
    position: "relative",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
    position: "absolute",
    left: 0,
    backgroundColor: "#4CAF50",
  },
  averageMarker: {
    position: "absolute",
    top: -20,
    alignItems: "center",
    transform: [{ translateX: -24 }, { translateY: 10 }],
  },
  markerLine: {
    height: 20,
    width: 2,
    backgroundColor: "gray",
  },
  markerText: {
    fontSize: 12,
    color: "gray",
    marginTop: 12,
  },
});
