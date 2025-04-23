import { View, StyleSheet, Alert } from "react-native";
import { DetailCards } from "../DetailCards/DetailCards";
import { ThemedButton } from "../ThemedComponents";
import * as Updates from "expo-updates";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../../hooks/useAuth";
import { usePhoto } from "../../context/PhotoContext";

export default function DashboardContent({
  latestEntry,
  setClosed,
  id,
  setUpdate,
}) {
  const { deletePost } = useAuth();
  const confirmDelete = () => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: handleDelete, style: "destructive" },
    ]);
  };
  const { setPostId } = usePhoto();
  const handleDelete = async () => {
    await deletePost(id);
    await Updates.reloadAsync();
  };

  const handleUpdate = () => {
    setClosed(false);
    setUpdate(true);
    setPostId(id);
  };

  return latestEntry ? (
    <View style={styles.container}>
      <DetailCards
        age={latestEntry.age}
        weight={latestEntry.weight}
        symptoms={latestEntry.symptoms}
      />
      <View style={styles.buttons}>
        <ThemedButton
          style={styles.actionButton}
          onPress={confirmDelete}
          borderRadius={50}
          color="attention"
          hollow
          title={<Feather name="trash" size={24} color="#d03533" />}
        />
        <ThemedButton
          style={styles.actionButton}
          borderRadius={50}
          onPress={handleUpdate}
          title={<Feather name="edit" size={24} color="#fff" />}
        />
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 12,
    transform: [{ translateY: -285 }],
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
  },
});
