import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "../../ThemedComponents";
import { Dropdown } from "../../Dropdown";
import { useNavigation } from "@react-navigation/native";

export default function PetActionsDropdown({ onDelete, setVisible }) {
  const navigation = useNavigation();

  const confirmAndDelete = () => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <Dropdown
      title={
        <Feather name="more-horizontal" size={24} color="rgba(0,0,0,0.6)" />
      }
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("update/update");
          setVisible(false);
        }}
        style={[styles.dropdownItem, styles.addEntryBackground]}
      >
        <ThemedText style={styles.addEntryText}>Add Entry</ThemedText>
        <Feather
          name="plus"
          size={20}
          color="#4a70e2"
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={confirmAndDelete}
        style={[styles.dropdownItem, styles.deleteBackground]}
      >
        <ThemedText style={styles.deleteText}>Delete</ThemedText>
        <Feather
          name="trash-2"
          size={20}
          color="#ff3b30"
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>
    </Dropdown>
  );
}

const styles = StyleSheet.create({
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteText: {
    fontSize: 16,
    color: "#ff3b30",
    fontWeight: "500",
  },
  addEntryText: {
    fontSize: 16,
    color: "#4a70e2",
    fontWeight: "500",
  },
  addEntryBackground: {
    backgroundColor: "rgba(74, 112, 226, 0.1)",
  },
  deleteBackground: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
});
