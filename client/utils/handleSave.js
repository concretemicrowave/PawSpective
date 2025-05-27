import { Alert } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useReload } from "@/context/ReloadContext";
import { useAuth } from "@/hooks/useAuth";

export const useHandleSave = () => {
  const router = useRouter();
  const { triggerReload } = useReload();
  const { savePost } = useAuth();

  const handleSave = async ({
    update,
    postId,
    userData,
    setUserData,
    setPostId,
    postFields,
  }) => {
    if (typeof savePost !== "function") {
      console.error("savePost is not available");
      Alert.alert("Error", "Unable to save right now");
      return false;
    }
    if (!postFields.name) return Alert.alert("Pet's name is required");

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      let finalPostId = postId;
      if (!update) {
        const existingIds = Object.keys(userData?.posts ?? {});
        const maxId = existingIds.length
          ? Math.max(...existingIds.map((id) => parseInt(id, 10)))
          : 0;
        finalPostId = String(maxId + 1);
      }

      const post = {
        ...postFields,
        postId: finalPostId,
      };

      const data = await savePost(post);

      if (!data.success) {
        Alert.alert("Error", data.message?.message || "Something went wrong");
        return false;
      }

      const newPost = data.data.post;
      setUserData((prev) => ({
        ...prev,
        posts: { ...(prev?.posts ?? {}), [newPost.postId]: newPost },
      }));
      setPostId(null);
      triggerReload();
      router.push("(tabs)");
      return true;
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "An unexpected error occurred");
      return false;
    }
  };

  return handleSave;
};
