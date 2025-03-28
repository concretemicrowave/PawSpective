import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { getTimeUntilExpiration } from "@/utils/PostUtils";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

export default function Post({ post }) {
  const headerBackgroundColor = Colors["light"].background;
  const borderColor = Colors["light"].border;
  const textColor = Colors["light"].text;

  const { text: timeUntilExpiration, color: expiryColor } =
    getTimeUntilExpiration(post.expires);

  return (
    <View style={styles.container}>
      <PostHeader post={post} textColor={textColor} borderColor={borderColor} />
      <PostBody
        post={post}
        borderColor={borderColor}
        headerBackgroundColor={headerBackgroundColor}
        expiryColor={expiryColor}
        timeUntilExpiration={timeUntilExpiration}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
});
