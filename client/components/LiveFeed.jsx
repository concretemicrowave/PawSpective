import { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function LiveFeed() {
  const SERVER_IP = "192.168.212.129"; // your server IP
  const SERVER_PORT = 8000;
  const REFRESH_INTERVAL = 1000;

  const [uri, setUri] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateUri();
    const id = setInterval(updateUri, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  function updateUri() {
    setUri(`http://${SERVER_IP}:${SERVER_PORT}/snapshot.jpg?ts=${Date.now()}`);
  }

  return (
    <View style={styles.container}>
      {uri && (
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="contain"
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      )}
      {loading && (
        <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
      )}
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => {
          // optional: you could manually trigger updateUri() here or log
        }}
      >
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
