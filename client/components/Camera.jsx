import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import useCameraActions from "../utils/CameraUtils";
import * as Haptics from "expo-haptics";
import Animated from "react-native-reanimated";
import ImagePickerButton from "./ImagePickerButton";

export default function CameraComponent() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(false);
  const { takePhoto } = useCameraActions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleImagePicked = (imageUri) => {
    takePhoto(imageUri, setLoading);
  };

  if (!permission?.granted) return null;

  return (
    <View style={styles.cameraWrapper}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <CameraView
          style={styles.camera}
          type="back"
          ref={(ref) => setCamera(ref)}
        />
      </Animated.View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => {
          takePhoto(camera, setLoading);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        disabled={loading}
      >
        <View style={styles.inner} />
      </TouchableOpacity>

      <ImagePickerButton onImagePicked={handleImagePicked} disabled={loading} />
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
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  inner: {
    width: 76,
    height: 76,
    borderRadius: 50,
    backgroundColor: "white",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
