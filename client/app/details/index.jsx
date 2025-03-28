import { usePhoto } from "../../context/PhotoContext";
import { Image, StyleSheet } from "react-native";
import { ThemedView, ThemedText } from "../../components/ThemedComponents";

export default function Details() {
  const { photoUri } = usePhoto();

  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} />
      <ThemedText style={styles.text}>{photoUri}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
});
