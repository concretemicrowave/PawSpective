import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CameraComponent from "../../components/Camera";
import { usePhoto } from "../../context/PhotoContext";
import { useIsFocused } from "@react-navigation/native";
import Title from "../../components/Title";
import { BackLink } from "../../components/BackLink";

export default function CameraScreen() {
  const isFocused = useIsFocused();
  const { setUpdate } = usePhoto();

  useEffect(() => {
    if (isFocused) {
      setUpdate(false);
    }
  }, [isFocused]);

  return (
    <>
      <BackLink white={false} />
      <View style={styles.container}>
        <Title text="New Pet" />
        {isFocused ? <CameraComponent /> : null}
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
