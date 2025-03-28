import { StyleSheet, View } from "react-native";
import CameraComponent from "../../components/Camera";

export default function CameraScreen() {
  return (
    <>
      <View style={styles.container}>
        <CameraComponent onCapture={(photo) => setPhoto(photo)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
