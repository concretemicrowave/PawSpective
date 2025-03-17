import { StyleSheet } from "react-native";
import { ThemedView } from "../../../components/ThemedView";
import { Icon } from "../../../components/Icon";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedInput } from "../../../components/ThemedInput";
import { ThemedButton } from "../../../components/ThemedButton";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Icon size={20} icon={faUserPlus} />
        <ThemedText type="subtitle">Register</ThemedText>
      </ThemedView>
      <ThemedView style={styles.inputContainer}>
        <ThemedInput required style={styles.input} placeholder="Email" />
        <ThemedInput required style={styles.input} placeholder="Password" />
        <ThemedButton color="primary" title="Create Account" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "left",
    paddingBottom: 20,
    padding: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: {
    width: "100%",
    marginTop: 12,
  },
  input: {
    marginBottom: 10,
  },
});
