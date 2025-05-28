import { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function LiveFeed() {
  const SERVER_IP = "192.168.232.63";
  const SERVER_PORT = 8000;
  const REFRESH_INTERVAL = 1000;

  const [uri, setUri] = useState("");

  useEffect(() => {
    setUri(getUri());
    const id = setInterval(() => {
      setUri(getUri());
    }, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  function getUri() {
    return `http://${SERVER_IP}:${SERVER_PORT}/latest.jpg?ts=${Date.now()}`;
  }

  const handleCapture = () => {
    console.log("Capture button pressed – implement snapshot logic if needed");
    // Add functionality here if you want to save the frame or trigger something else.
  };

  return (
    <View style={styles.container}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      ) : null}

      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <View style={styles.inner} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
});
