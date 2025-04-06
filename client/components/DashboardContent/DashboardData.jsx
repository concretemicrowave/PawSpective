import { StyleSheet, View, Alert } from "react-native";
import { ThemedText, ThemedButton } from "../ThemedComponents";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../../hooks/useAuth";
import * as Updates from "expo-updates";

export default function DashboardData({ data, setClosed, setUpdate }) {
  const { deletePost } = useAuth();
  const confirmDelete = () => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: handleDelete, style: "destructive" },
    ]);
  };

  const handleDelete = async () => {
    await deletePost(data.id);
    await Updates.reloadAsync();
  };

  const handleUpdate = async () => {
    console.log("Updating post");
    setClosed(false);
    setUpdate(true);
  };

  return data ? (
    <>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Progress</ThemedText>
        <ThemedText style={styles.data}>
          Insert graph of progress here
        </ThemedText>
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
    </>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    transform: [{ translateY: -285 }],
    width: "90%",
    marginLeft: "5%",
  },
  title: {
    fontSize: 20,
  },
  data: {
    marginBottom: 8,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
});
