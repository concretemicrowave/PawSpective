import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedInput } from "../../components/ThemedInput";
import { StyleSheet } from "react-native";

export default function openScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Not Logged In?</ThemedText>
      <ThemedView style={styles.inputContainer}>
        <ThemedInput style={styles.input} placeholder="Email" />
        <ThemedInput style={styles.input} placeholder="Password" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    padding: 30,
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    width: "100%",
  },
});
