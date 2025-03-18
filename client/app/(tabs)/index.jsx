import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

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

  const handleCapture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      console.log(photo);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraWrapper}>
        <CameraView
          style={styles.camera}
          type="back"
          ref={(ref) => setCamera(ref)}
        />
      </View>
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  cameraWrapper: {
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
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    color: "white",
  },
});
