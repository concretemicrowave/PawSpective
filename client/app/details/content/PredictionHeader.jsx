import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ThemedText } from "../../../components/ThemedComponents";

export default function PredictionHeader({ breed, predicting }) {
  return (
    <>
      <ThemedText type="subtitle" style={styles.title}>
        {predicting
          ? ""
          : breed
            ? `Your ${breed}!`
            : "Can't seem to find your pet. Retake your photo."}
      </ThemedText>
      {predicting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
      {!predicting && breed && (
        <View style={styles.note}>
          <ThemedText style={{ fontSize: 14 }}>
            Results are AI, not always accurate.
          </ThemedText>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  note: {
    backgroundColor: "#e6e6e6",
    padding: 4,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    opacity: 0.7,
  },
});
