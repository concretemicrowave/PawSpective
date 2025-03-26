import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { ThemedText, ThemedButton } from "../../ThemedComponents";

export default function PostHeader({ post, textColor, borderColor }) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});
