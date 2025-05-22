import * as FileSystem from "expo-file-system";
import { useCallback } from "react";
import { usePhoto } from "@/context/PhotoContext";
import { useRouter } from "expo-router";

const useCameraActions = () => {
  const { setPhotoUri } = usePhoto();
  const router = useRouter();

  const takePhoto = async (cameraOrUri, setLoading) => {
    let uri;

    if (typeof cameraOrUri === "string") {
      uri = cameraOrUri;
    } else if (cameraOrUri?.takePictureAsync) {
      const photo = await cameraOrUri.takePictureAsync({ quality: 1 });
      uri = photo.uri;
    } else {
      console.error("Invalid camera reference or URI.");
      return;
    }

    setLoading(true);
    setPhotoUri(uri);
    setLoading(false);
    router.push("details");
  };

  const deleteImage = useCallback(async (uri) => {
    try {
      if (uri.startsWith("file://")) {
        await FileSystem.deleteAsync(uri);
      } else {
        console.log("URI is not a local file.");
      }
    } catch (error) {
      console.error("Error deleting the image: ", error);
    }
  }, []);

  const uriToBase64 = useCallback(async (uri) => {
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }, []);

  const handleUpdate = async (data) => {
    const post = {
      data,
      update: true,
    };
    await savePost(post);
    await Updates.reloadAsync();
  };

  return { takePhoto, deleteImage, uriToBase64, handleUpdate };
};

export default useCameraActions;
