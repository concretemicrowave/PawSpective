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
});
