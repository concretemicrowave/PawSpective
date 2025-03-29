import { StyleSheet, View } from "react-native";
import { ThemedView, ThemedText } from "../ThemedComponents";

export function DetailCard({ title, bold, style }) {
  return (
    <ThemedView style={[styles.card, style]}>
      <ThemedText style={styles.cardTitle}>{title}</ThemedText>
      <ThemedText type="title" style={styles.bold}>
        {bold}
      </ThemedText>
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
  },
});
