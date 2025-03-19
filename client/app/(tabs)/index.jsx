import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, SafeAreaView } from "react-native";
import * as FileSystem from "expo-file-system";
import CameraComponent from "../../components/CameraComponent";
import { useCameraPermissions } from "expo-camera";
import { Drawer } from "../../components/Drawer";

import DrawerContent from "../../components/CameraDrawer/DrawerContent";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CameraComponent onCapture={(photo) => setPhoto(photo)} />
      </SafeAreaView>
      <Drawer toggle={photo} height={850} title={"New Post"}>
        <DrawerContent image={photo} />
      </Drawer>
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
  message: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    color: "white",
  },
});
