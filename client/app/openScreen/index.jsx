import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedInput } from "../../components/ThemedInput";
import { ThemedButton } from "../../components/ThemedButton";
import { Icon } from "../../components/Icon";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet } from "react-native";

export default function openScreen() {
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          <Icon size={20} icon={faUser} />
          <ThemedText steel type="subtitle">
            Not Logged In?
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.inputContainer}>
          <ThemedInput required style={styles.input} placeholder="Email" />
          <ThemedInput required style={styles.input} placeholder="Password" />
          <ThemedButton color="primary" title="Login" />
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <ThemedButton
          style={styles.register}
          color="primary"
          borderRadius={25}
          hollow
          title="Create Account"
        />
      </ThemedView>
    </>
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: {
    width: "100%",
    marginTop: 12,
  },
  register: {
    marginTop: "auto",
    marginHorizontal: 30,
    marginVertical: 30,
  },
  input: {
    width: "100%",
  },
});
