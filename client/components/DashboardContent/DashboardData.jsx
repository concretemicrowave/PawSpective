import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedButton } from "../ThemedComponents";
import Feather from "react-native-vector-icons/Feather";

export default function DashboardData({ data }) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Progress</ThemedText>
      <ThemedText style={styles.data}>Insert graph of progress here</ThemedText>
      <View style={styles.buttons}>
        <ThemedButton
          style={styles.actionButton}
          onPress={() => {}}
          borderRadius={50}
          color="attention"
          hollow
          title={<Feather name="trash" size={24} color="#d03533" />}
        />
        <ThemedButton
          style={styles.actionButton}
          onPress={() => {}}
          borderRadius={50}
          title={<Feather name="edit" size={24} color="#fff" />}
        />
      </View>
    </View>
  );
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
