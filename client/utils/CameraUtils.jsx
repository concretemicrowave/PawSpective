const takePhoto = async (camera, onCapture) => {
  if (camera) {
    const photo = await camera.takePictureAsync();
    onCapture(photo);
  }
};

import * as FileSystem from "expo-file-system";

const deleteImage = async (uri) => {
  try {
    if (uri.startsWith("file://")) {
      await FileSystem.deleteAsync(uri);
    } else {
      console.log("URI is not a local file.");
    }
  } catch (error) {
    console.error("Error deleting the image: ", error);
  }
};

export { takePhoto, deleteImage };
