import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CameraComponent from "../../components/Camera";
import { usePhoto } from "../../context/PhotoContext";
import { useIsFocused } from "@react-navigation/native";
import Title from "../../components/Title";
import { BackLink } from "../../components/BackLink";
import { ThemedButton } from "../../components/ThemedComponents";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const isFocused = useIsFocused();
  const router = useRouter();

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
  topRightButton: {
    position: "absolute",
    bottom: 95,
    right: 23,
    zIndex: 1000,
    paddingHorizontal: 20,
  },
});
