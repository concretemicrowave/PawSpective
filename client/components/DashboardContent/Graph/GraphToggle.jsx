import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "../../ThemedComponents";

export function GraphToggle({ isWeight, setIsWeight }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          isWeight ? styles.toggleButtonActive : styles.toggleButtonInactive
        }
        onPress={() => setIsWeight(true)}
      >
        <ThemedText
          type="subtitle"
          style={isWeight ? styles.toggleTextActive : styles.toggleTextInactive}
        >
          Weight
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          !isWeight ? styles.toggleButtonActive : styles.toggleButtonInactive
        }
        onPress={() => setIsWeight(false)}
      >
        <ThemedText
          type="subtitle"
          style={
            !isWeight ? styles.toggleTextActive : styles.toggleTextInactive
          }
        >
          Health Score
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
  toggleButtonInactive: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleTextInactive: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleTextActive: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
