import { usePhoto } from "../../context/PhotoContext";
import { Image, StyleSheet, SafeAreaView, View } from "react-native";
import { ThemedView, ThemedText } from "../../components/ThemedComponents";
import Details from "./details";
import { BackLink } from "../../components/BackLink";

export default function DetailsScreen() {
  const { photoUri } = usePhoto();

  return (
    <>
      <BackLink white={false} />
      <ThemedView style={styles.container}>
        <View style={{ height: "100%", width: "100%" }}>
          <SafeAreaView style={styles.title}>
            <ThemedText style={styles.text}>Overview</ThemedText>
          </SafeAreaView>
          <Image source={{ uri: photoUri }} style={styles.image} />
        </View>
        <Details />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "35%",
  },
  title: {
    position: "absolute",
    zIndex: 10000,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
});
