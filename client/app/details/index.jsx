import { usePhoto } from "../../context/PhotoContext";
import { Image, StyleSheet, View } from "react-native";
import { ThemedView } from "../../components/ThemedComponents";
import Details from "./details";
import { BackLink } from "../../components/BackLink";
import Title from "../../components/Title";

export default function DetailsScreen() {
  const { photoUri } = usePhoto();

  return (
    <>
      <BackLink white={false} />
      <ThemedView style={styles.container}>
        <View style={{ height: "100%", width: "100%" }}>
          <Title text="Overview" />
          <Image source={{ uri: photoUri }} style={styles.image} />
        </View>
        <Details uri={photoUri} />
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
});
