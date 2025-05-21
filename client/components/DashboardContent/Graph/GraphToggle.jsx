import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "../../ThemedComponents";
import * as Haptics from "expo-haptics";

export function GraphToggle({ isWeight, setIsWeight }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          isWeight ? styles.toggleButtonActive : styles.toggleButtonInactive
        }
        onPress={() => {
          Haptics.selectionAsync();
          setIsWeight(true);
        }}
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
        onPress={() => {
          Haptics.selectionAsync();
          setIsWeight(false);
        }}
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
    paddingVertical: 8,
    transform: [{ translateY: -16 }],
    gap: 8,
  },
  toggleButtonInactive: {
    borderRadius: 10,
    paddingVertical: 9,
    backgroundColor: "#e6e6e6",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: {
    borderRadius: 10,
    paddingVertical: 9,
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
