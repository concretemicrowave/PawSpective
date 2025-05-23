import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import useCameraActions from "../../utils/CameraUtils";
import * as Haptics from "expo-haptics";
import Animated from "react-native-reanimated";

export default function UpdateCameraComponent() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(false);
  const { takePhoto } = useCameraActions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log("Picked image URI:", imageUri);
      takePhoto(imageUri, setLoading);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  if (!permission?.granted) return null;

  return (
    <View style={styles.cameraWrapper}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <CameraView
          style={styles.camera}
          type="back"
          ref={(ref) => setCamera(ref)}
          zoom={0.1}
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
      <TouchableOpacity
        style={styles.libraryButton}
        onPress={handlePickImage}
        disabled={loading}
      >
        <Ionicons name="image-outline" size={30} color="white" />
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
  libraryButton: {
    position: "absolute",
    bottom: 50,
    left: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    padding: 10,
  },
});
