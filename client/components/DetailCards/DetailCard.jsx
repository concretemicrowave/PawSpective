import { StyleSheet, View } from "react-native";
import { ThemedView, ThemedText } from "../ThemedComponents";
import { ProgressBar } from "../ProgressBar";

export function DetailCard({ title, bold, progress, average, style }) {
  return (
    <ThemedView style={[styles.card, style]}>
      <ThemedText style={styles.cardTitle}>{title}</ThemedText>
      <ThemedText type="title" style={styles.bold}>
        {bold}
      </ThemedText>
      {title !== "Symptoms" && (
        <ProgressBar progress={progress} average={average} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    paddingVertical: 12,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    opacity: 0.6,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
    marginBottom: 12,
  },
});
