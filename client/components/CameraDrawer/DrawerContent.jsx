import { StyleSheet, View, Image } from "react-native";
import { ThemedText } from "../ThemedText";

export default function DrawerContent({ image }) {
  console.log(image);
  return (
    <View style={styles.container}>
      <Image source={{ uri: image.uri }} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
