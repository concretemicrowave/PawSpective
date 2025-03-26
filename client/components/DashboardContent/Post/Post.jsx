import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getTimeUntilExpiration } from "@/utils/getTimeUntilExpiration";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

export default function Post({ post }) {
  const theme = useColorScheme();
  const headerBackgroundColor = Colors[theme].background;
  const borderColor = Colors[theme].border;
  const textColor = Colors[theme].text;

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
