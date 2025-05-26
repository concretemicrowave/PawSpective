import { ThemedButton } from "../../../components/ThemedComponents";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SaveButton({ breed, update, weight, onPress }) {
  const router = useRouter();

  if (!breed) return null;

  return (
    <View style={styles.buttonContainer}>
      <ThemedButton
        title="Add Goal"
        hollow
        borderRadius={50}
        onPress={() =>
          router.push({
            pathname: "numberLine/NumberLine",
            params: { initialWeight: weight.toString() },
          })
        }
        leftIcon={<MaterialCommunityIcons name="plus" size={20} color="#000" />}
        style={styles.sideButton}
      />
      <ThemedButton
        title={update ? "Update" : "Save"}
        borderRadius={50}
        onPress={onPress}
        style={styles.sideButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  sideButton: {
    flex: 1,
  },
});
