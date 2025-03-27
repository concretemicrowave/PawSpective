import { StyleSheet, View, Image, Alert } from "react-native";
import { ThemedText, ThemedButton, ThemedView } from "../ThemedComponents";
import { useUser } from "../../context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Nutriments } from "../Nutriments/Nutriments";

export default function DrawerContent({ image, setOpen, setClosed }) {
  const { savePost } = useAuth();
  const { userData, setUserData } = useUser();
  const [disabled, setDisabled] = useState(false);

  const post = {
    uri: image?.product?.image_url,
    title: image?.product?.product_name_en || "Unknown Product",
    expires: image?.product?.expiration_date
      ? image.product.expiration_date
      : "1435-01-01",
    taken: new Date().toISOString().split("T")[0],
    nutrients: {
      calories: image?.product?.nutriments["energy-kcal"] || 0,
      protein: image?.product?.nutriments?.proteins || 0,
      carbs: image?.product?.nutriments?.carbohydrates || 0,
      fat: image?.product?.nutriments?.fat || 0,
      fats_unit: image?.product?.nutriments?.fat_unit || "g",
      sugar: image?.product?.nutriments?.sugars || 0,
      sugars_unit: image?.product?.nutriments?.sugars_unit || "g",
      fiber: image?.product?.nutriments?.fiber || 0,
      fiber_unit: image?.product?.nutriments?.fiber_unit || "g",
    },
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
          <Image source={{ uri: post.uri }} style={styles.logo} />
          <View style={{ flex: 1 }}>
            <ThemedText type="subtitle">{post.title}</ThemedText>
            <ThemedText style={{ opacity: 0.8, marginBottom: 10 }}>
              Expires {post.expires == "1435-01-01" ? "Never" : post.expires}
            </ThemedText>
            <Nutriments nutriments={post.nutrients} />
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
    aspectRatio: 4 / 5,
    marginBottom: 10,
    borderRadius: 12,
  },
});
