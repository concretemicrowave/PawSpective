import { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { takePhoto } from "../utils/CameraUtils";
import { ThemedText } from "./ThemedComponents";

export default function CameraComponent({ onCapture, setClosed, setPhoto }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission?.granted) {
    return null;
  }

  const handleBarcodeScanned = ({ data }) => {
    setScanned(true);
    setTimeout(async () => {
      await takePhoto(data, setPhoto, onCapture);
      setScanned(false);
      setClosed(false);
    }, 1000);
  };

  return (
    <View style={styles.cameraWrapper}>
      <CameraView
        style={styles.camera}
        type="back"
        ref={cameraRef}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />
      <View style={styles.scanOverlay}>
        <ThemedText style={styles.scanText}>
          Scan a food product's barcode
        </ThemedText>
      </View>
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
    bottom: 150,
    borderColor: "white",
    borderWidth: 6,
    borderRadius: 50,
    width: 90,
    height: 90,
    alignSelf: "center",
  },
  scanOverlay: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 12,
  },
});
