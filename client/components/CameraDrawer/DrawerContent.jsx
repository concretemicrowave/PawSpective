import { StyleSheet, View, Image } from "react-native";
import { ThemedText, ThemedButton } from "../ThemedComponents";
import { useAuth } from "@/hooks/useAuth";

export default function DrawerContent({ image }) {
  const { savePost } = useAuth();

  const post = {
    uri: image.uri,
    title: "Something",
    nutrients: { calories: 200, protein: "10g", carbs: "30g" },
  };

  const handleSavePost = async () => {
    try {
      const data = await savePost(post);
      console.log("Post ID:", data.postId);
    } catch (err) {
      console.error("Save post failed:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: image.uri }} style={styles.logo} />
        <View>
          <ThemedText type="subtitle">*Insert food</ThemedText>
          <ThemedText style={{ opacity: 0.8 }}>Expires something</ThemedText>
        </View>
      </View>
      <ThemedButton
        hollow
        borderRadius={50}
        title="Save"
        onPress={handleSavePost}
        style={{ marginTop: "auto", marginBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  logo: {
    width: "50%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 12,
  },
});
