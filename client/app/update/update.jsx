import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import UpdateCameraComponent from "../../components/DashboardContent/UpdateCamera";
import { BackLink } from "../../components/BackLink";
import Title from "../../components/Title";

export default function UpdateCameraScreen() {
  const isFocused = useIsFocused();

  return (
    <>
      <BackLink white={false} />
      <View style={styles.container}>
        <Title text="Update Photo" />
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
