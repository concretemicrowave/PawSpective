import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import UpdateCameraComponent from "../../components/DashboardContent/UpdateCamera";
import { BackLink } from "../../components/BackLink";
import Title from "../../components/Title";
import { ThemedButton } from "../../components/ThemedComponents";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

export default function UpdateCameraScreen() {
  const isFocused = useIsFocused();
  const router = useRouter();

  return (
    <>
      <BackLink white={false} />
      <View style={styles.container}>
        <Title text="Add Entry" />
        <ThemedButton
          title={
            <MaterialCommunityIcons
              name="link-variant"
              size={30}
              style={styles.connectIcon}
            />
          }
          style={styles.topRightButton}
          color="white"
          text="black"
          borderRadius={50}
          onPress={() => router.push("/live")}
        />
        {isFocused ? <UpdateCameraComponent /> : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topRightButton: {
    position: "absolute",
    bottom: 95,
    right: 30,
    zIndex: 1000,
    paddingHorizontal: 20,
  },
  connectIcon: {
    alignSelf: "center",
  },
});
