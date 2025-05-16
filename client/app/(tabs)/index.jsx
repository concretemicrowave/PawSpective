import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CameraComponent from "../../components/Camera";
import { usePhoto } from "../../context/PhotoContext";
import { useIsFocused } from "@react-navigation/native";

export default function CameraScreen() {
  const isFocused = useIsFocused();
  const { update, setUpdate } = usePhoto();

  useEffect(() => {
    if (isFocused) {
      setUpdate(false);
    }
  }, [isFocused]);

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
