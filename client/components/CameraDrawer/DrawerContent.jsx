import { StyleSheet, View, Image, Alert } from "react-native";
import { ThemedText, ThemedButton, ThemedView } from "../ThemedComponents";
import { useUser } from "../../context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function DrawerContent({ image, setOpen, setClosed }) {
  const { savePost } = useAuth();
  const { userData, setUserData } = useUser();
  const [disabled, setDisabled] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const post = {
    uri: image.uri,
    title: "Something",
    expires: currentDate,
    nutrients: { calories: 200, protein: "10g", carbs: "30g" },
  };

  const handleSavePost = async () => {
    setDisabled(true);
    const data = await savePost(post);
    if (!data.success) return Alert.alert("Error", data.message.message);

    setUserData({
      ...userData,
      posts: [data.data.post, ...userData.posts],
    });
    setClosed(true);
    setOpen(true);
  };

  return (
    <>
      <ThemedView color="backgroundGrey" style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: image.uri }} style={styles.logo} />
          <View>
            <ThemedText type="subtitle">*Insert food</ThemedText>
            <ThemedText style={{ opacity: 0.8 }}>Expires something</ThemedText>
          </View>
        </View>
        <ThemedButton
          hollow
          disabled={disabled}
          borderRadius={50}
          title="Save"
          onPress={handleSavePost}
          style={{ marginTop: "auto", marginBottom: 80 }}
        />
      </ThemedView>
    </>
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
