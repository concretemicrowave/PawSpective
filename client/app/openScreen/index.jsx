import {
  ThemedView,
  ThemedText,
  ThemedButton,
} from "../../components/ThemedComponents";
import { Icon } from "../../components/Icon";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Login from "./authForms/login";
import RadialBlob from "../../assets/svgs/RadialBlob";

export default function openScreen() {
  const router = useRouter();

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          <Icon size={20} icon={faRightToBracket} />
          <ThemedText type="subtitle">Log In</ThemedText>
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
      <RadialBlob bottom={-20} right={-20} />
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
    zIndex: 1,
  },
});
