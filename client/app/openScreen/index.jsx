import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { StyleSheet } from "react-native";

export default function openScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Not Logged In?</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    alignItems: "center",
  },
});
