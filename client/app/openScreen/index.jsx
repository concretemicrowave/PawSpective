import { ThemedView } from "../../components/ThemedComponents/ThemedView";
import { ThemedText } from "../../components/ThemedComponents/ThemedText";
import { ThemedButton } from "../../components/ThemedComponents/ThemedButton";
import { Icon } from "../../components/Icon";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Login from "./authForms/login";

export default function openScreen() {
  const router = useRouter();

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          <Icon size={20} icon={faRightToBracket} />
          <ThemedText type="subtitle">Not Logged In?</ThemedText>
        </ThemedView>
        <Login />
      </ThemedView>
      <ThemedView>
        <ThemedButton
          style={styles.register}
          color="primary"
          borderRadius={25}
          hollow
          title="Create Account"
          onPress={() => router.push("openScreen/authForms/register")}
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
  register: {
    marginTop: "auto",
    marginHorizontal: 30,
    marginVertical: 30,
  },
});
