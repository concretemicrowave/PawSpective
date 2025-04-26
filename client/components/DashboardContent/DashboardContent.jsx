import { View, StyleSheet } from "react-native";
import { DetailCards } from "../DetailCards/DetailCards";
import { ThemedButton, ThemedText } from "../ThemedComponents";
import Feather from "react-native-vector-icons/Feather";
import { usePhoto } from "../../context/PhotoContext";
import HealthStatus from "../HealthStatus";

export default function DashboardContent({
  latestEntry,
  setClosed,
  id,
  setUpdate,
}) {
  const { setPostId } = usePhoto();
  const handleUpdate = () => {
    setClosed(false);
    setUpdate(true);
    setPostId(id);
  };

  return latestEntry ? (
    <View>
      <HealthStatus
        status={latestEntry.health_status}
        score={latestEntry.score}
      />
      <DetailCards
        age={latestEntry.age}
        weight={latestEntry.weight}
        symptoms={latestEntry.symptoms}
      />
      <View style={styles.buttons}>
        <ThemedButton
          style={styles.actionButton}
          borderRadius={50}
          onPress={handleUpdate}
          title={
            <View style={styles.buttonContent}>
              <Feather name="edit" size={24} color="#fff" />
              <View style={{ width: 8 }} />
              <ThemedText type="subtitle" style={styles.updateText}>
                Update
              </ThemedText>
            </View>
          }
        />
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  updateText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
