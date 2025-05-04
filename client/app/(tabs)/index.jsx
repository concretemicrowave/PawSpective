import { View, StyleSheet } from "react-native";
import CameraComponent from "../../components/Camera";
import { useIsFocused } from "@react-navigation/native";

export default function CameraScreen() {
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      {isFocused ? <CameraComponent /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
