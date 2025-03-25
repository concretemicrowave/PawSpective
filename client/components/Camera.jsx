import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { takePhoto } from "../utils/CameraUtils";

export default function CameraComponent({ onCapture, setClosed, setPhoto }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);

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
          takePhoto(camera, onCapture);
          setPhoto(camera);
          setTimeout(() => {
            setClosed(false);
          }, 750);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cameraWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: "absolute",
    bottom: 120,
    borderColor: "white",
    borderWidth: 6,
    borderRadius: 50,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
});
