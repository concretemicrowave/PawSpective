import { StyleSheet, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Chip } from "../../Chip";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock, faCamera } from "@fortawesome/free-solid-svg-icons";
import { Nutriments } from "../../Nutriments";
import { ThemedText } from "../../ThemedComponents";

export default function PostBody({
  post,
  borderColor,
  headerBackgroundColor,
  expiryColor,
  timeUntilExpiration,
}) {
  const formattedTaken = post.taken.split("T")[0];

  return (
    <View
      style={[
        styles.body,
        { backgroundColor: headerBackgroundColor, borderColor },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: post.uri }} />
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "transparent"]}
          locations={[0.9, 0]}
          style={styles.gradient}
        />
        <View style={styles.chipContainer}>
          <View style={styles.taken}>
            <FontAwesomeIcon color="white" icon={faCamera} />
            <ThemedText style={styles.taken}>{formattedTaken}</ThemedText>
          </View>
          <Chip
            icon={faClock}
            label={`${timeUntilExpiration}`}
            color={expiryColor}
          />
        </View>
      </View>
      <Nutriments nutriments={post.nutrients} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 12,
    flexDirection: "row",
    gap: 12,
  },
  imageContainer: {
    position: "relative",
    width: "50%",
    aspectRatio: 4 / 5,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  chipContainer: {
    position: "absolute",
    bottom: 4,
    left: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  taken: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
});
