import { StyleSheet, View, Image } from "react-native";
import { ThemedText, ThemedButton } from "../ThemedComponents";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Chip from "../Chip";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { getTimeUntilExpiration } from "@/utils/getTimeUntilExpiration";

export default function Post({ post }) {
  const theme = useColorScheme();
  const headerBackgroundColor = Colors[theme].background;
  const borderColor = Colors[theme].border;
  const textColor = Colors[theme].text;

  const { text: timeUntilExpiration, color: expiryColor } =
    getTimeUntilExpiration(post.expires);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { borderColor }]}>
        <ThemedText type="title" style={styles.title}>
          {post.title}
        </ThemedText>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <ThemedButton
            style={{ height: 36, aspectRatio: 1 }}
            padding={false}
            title={<FontAwesomeIcon color={textColor} icon={faPen} />}
            onPress={() => console.log("Edit post")}
            color="grey"
            borderRadius={10}
          />
          <ThemedButton
            hollow
            style={{ height: 36, aspectRatio: 1 }}
            padding={false}
            color="attention"
            title={<FontAwesomeIcon color="#d03533" icon={faTrash} />}
            onPress={() => console.log("Delete post")}
            borderRadius={10}
          />
        </View>
      </View>
      <View
        style={[
          styles.body,
          { backgroundColor: headerBackgroundColor, borderColor },
        ]}
      >
        <Image style={styles.image} source={{ uri: post.uri }} />
        <Chip hollow label={`${timeUntilExpiration}`} color={expiryColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  header: {
    padding: 16,
    paddingRight: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    padding: 12,
    flexDirection: "row",
    gap: 12,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    borderRadius: 12,
  },
});
