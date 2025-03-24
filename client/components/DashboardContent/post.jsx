import { StyleSheet, View, Image } from "react-native";
import { ThemedText, ThemedButton } from "../ThemedComponents";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function Post({ post }) {
  const theme = useColorScheme();
  const headerBackgroundColor = Colors[theme].background;
  const borderColor = Colors[theme].border;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { borderColor }]}>
        <ThemedText type="title" style={styles.title}>
          {post.title}
        </ThemedText>
      </View>
      <View
        style={[
          styles.body,
          { backgroundColor: headerBackgroundColor, borderColor },
        ]}
      >
        <Image style={styles.image} source={{ uri: post.uri }} />
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
    paddingVertical: 8,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    padding: 12,
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
});
