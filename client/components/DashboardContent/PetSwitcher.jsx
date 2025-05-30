import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedComponents";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function PetSwitcher({ petData, onPress }) {
  if (!petData) return null;

  return (
    <TouchableOpacity style={styles.switchButton} onPress={onPress}>
      <MaterialCommunityIcons name="swap-horizontal" size={24} />
      <ThemedText
        type="subtitle"
        style={styles.switchButtonText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {petData.name}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switchButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  switchButtonText: {
    fontSize: 18,
    maxWidth: "90%",
  },
});
