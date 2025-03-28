import * as FileSystem from "expo-file-system";
import { useCallback } from "react";
import { usePhoto } from "@/context/PhotoContext";
import { useRouter } from "expo-router";

const useCameraActions = () => {
  const { setPhotoUri } = usePhoto();
  const router = useRouter();

  const takePhoto = async (camera) => {
    if (camera) {
      const photo = await camera.takePictureAsync({ quality: 1 });
      setPhotoUri(photo.uri);
      router.push("details");
    }
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

  return { takePhoto, deleteImage, uriToBase64 };
};

export default useCameraActions;
