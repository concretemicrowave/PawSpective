import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import useCameraActions from "../utils/CameraUtils";

export default function CameraComponent() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const { takePhoto } = useCameraActions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission?.granted) {
    return null;
  }

  return (
    <View style={styles.cameraWrapper}>
      <CameraView
        style={styles.camera}
        type="back"
        ref={(ref) => setCamera(ref)}
      />
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => {
          takePhoto(camera);
        }}
      >
        <View style={styles.inner} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: "absolute",
    bottom: 80,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 50,
    width: 90,
    height: 90,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 76,
    height: 76,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
