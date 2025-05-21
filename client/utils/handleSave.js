import { Alert } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useReload } from "@/context/ReloadContext";

export const useHandleSave = () => {
  const router = useRouter();
  const { triggerReload } = useReload();

  const handleSave = async ({
    update,
    postId,
    userData,
    setUserData,
    setPostId,
    savePost,
    postFields,
  }) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    let finalPostId = postId;
    if (!update) {
      const existingIds = Object.keys(userData.posts || {});
      const maxId = existingIds.length
        ? Math.max(...existingIds.map((id) => parseInt(id)))
        : 0;
      finalPostId = String(maxId + 1);
    }

    const post = {
      ...postFields,
      postId: finalPostId,
    };

    const data = await savePost(post);
    if (!data.success) {
      return Alert.alert(
        "Error",
        data.message?.message || "Something went wrong",
      );
    }

    const newPost = data.data.post;

    setUserData((prev) => ({
      ...prev,
      posts: {
        ...prev.posts,
        [newPost.postId]: newPost,
      },
    }));

    setPostId(null);
    triggerReload();
    router.push("(tabs)");
  };

  return handleSave;
};
